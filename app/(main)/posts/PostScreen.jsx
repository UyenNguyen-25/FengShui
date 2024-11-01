import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { pondsService } from '../../../services/elements/pondsService';
import { koiFishService } from '../../../services/elements/koiFishService';
import { postService } from '../../../services/post/postService';
import { useAuth } from '@/hooks/useAuth'
import { userService } from '@/services/users/userService';

export default function PostScreen() {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [element, setElement] = useState(null);
    const [pond, setPond] = useState(null);
    const [koi, setKoi] = useState(null);
    const [fileUri, setFileUri] = useState(null);
    const [ponds, setPonds] = useState([]);
    const [kois, setKois] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const fetchPonds = async () => {
            const response = await pondsService.getAll();
            console.log('pond', response.data)
            if (response.success) setPonds(response.data);
        };

        const fetchKois = async () => {
            const response = await koiFishService.getAll();
            console.log('koi', response.data)
            if (response.success) setKois(response.data);
        };
        

        fetchPonds();
        fetchKois();
    }, []);

    useEffect(() => {
        if (element) {
            const fetchKoisByElement = async () => {
                const response = await koiFishService.getListByElement(element);
                if (response.success) setKois(response.data);
            };
            fetchKoisByElement();
        } else {
            setKois([]);
        }
    }, [element]);

    const handlePost = async () => {
        const newPostData = {
            title,
            description,
            file: [fileUri],
            element,
            koi_id: koi,
            pond_id: pond,
        };
    
        const response = await postService.insertPost(newPostData, user.id);
    
        if (response.success) {
            const updateResponse = await userService.updateTotalPosts(user.id);
            if (!updateResponse.success) {
                Alert.alert("Error", updateResponse.msg || "Could not update total posts. Please try again.");
            }
            
            Alert.alert("Success", "Your post has been created!");
            setTitle('');
            setDescription('');
            setFileUri(null);
            setElement(null);
            setPond(null);
            setKoi(null);
        } else {
            Alert.alert("Error", response.msg || "Could not create post. Please try again.");
        }
    };
    
    

    const openImageLibrary = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFileUri(result.assets[0].uri);
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tạo bài viết</Text>
                <Button title="Đăng" onPress={handlePost} />
            </View>

            <View style={styles.userSection}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png' }} style={styles.avatar} />
                <Text style={styles.username}>Lưu Ái Giao</Text>
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={element}
                    onValueChange={(itemValue) => setElement(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Chọn Mệnh" value={null} />
                    <Picker.Item label="Kim" value="metal" />
                    <Picker.Item label="Mộc" value="wood" />
                    <Picker.Item label="Thủy" value="water" />
                    <Picker.Item label="Hỏa" value="fire" />
                    <Picker.Item label="Thổ" value="earth" />
                </Picker>

                <Picker
                    selectedValue={pond}
                    onValueChange={(itemValue) => setPond(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Chọn Hồ cá" value={null} />
                    {ponds.map((pond) => (
                        <Picker.Item 
                            key={pond.id} 
                            label={`${pond.pond_shape} - ${pond.suit_element}`}
                            value={pond.id} 
                        />
                    ))}
                </Picker>

                <Picker
                    selectedValue={koi}
                    onValueChange={(itemValue) => setKoi(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Chọn Cá Koi" value={null} />
                    {kois.map((koi) => (
                        <Picker.Item 
                            key={koi.id} 
                            label={`${koi.name} - ${koi.suit_element}`} 
                            value={koi.id} 
                        />
                    ))}
                </Picker>
            </View>

            <TextInput
                style={styles.input1}
                placeholder='Tiêu đề'
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Bạn đang nghĩ gì?"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity style={styles.imageButton} onPress={openImageLibrary}>
                <Text>Ảnh/Video</Text>
            </TouchableOpacity>

            {fileUri && (
                <Image
                    source={{ uri: fileUri }}
                    style={styles.selectedImage}
                />
            )}
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input1: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    input: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    pickerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10
    },
    picker: {
        width: '100%',
        backgroundColor: '#72A9E6'
    },
    imageButton: {
        alignItems: 'center',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10
    },
    selectedImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10
    }
});
