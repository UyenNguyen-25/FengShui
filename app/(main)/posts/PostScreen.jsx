import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function PostScreen() {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [element, setElement] = useState(null);
    const [pond, setPond] = useState(null);
    const [koi, setKoi] = useState(null);
    const [fileUri, setFileUri] = useState(null);

    const handlePost = () => {
        console.log({
            userId: "user_id_placeholder",
            description,
            title: "New Post",
            element,
            pond,
            koi,
            fileUri
        });
    };

    const launchImageLibrary = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
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
                    <Picker.Item label="Chọn Ngũ hành" value={null} />
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
                    <Picker.Item label="Pond 1" value="pond1" />
                    <Picker.Item label="Pond 2" value="pond2" />
                </Picker>

                <Picker
                    selectedValue={koi}
                    onValueChange={(itemValue) => setKoi(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Chọn Cá Koi" value={null} />
                    <Picker.Item label="Koi 1" value="koi1" />
                    <Picker.Item label="Koi 2" value="koi2" />
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

            <TouchableOpacity style={styles.imageButton} onPress={launchImageLibrary}>
                <Text>Ảnh/Video</Text>
            </TouchableOpacity>

            {fileUri && (
                <Image
                    source={{ uri: fileUri }}
                    style={styles.selectedImage}
                />
            )}
        </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    picker: {
        width: '30%',
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
