import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { postService } from '../../../services/post/postService';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/users/userService';

export default function PostScreen({ route, navigation }) {
    const { fetchPosts } = route.params;
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [element, setElement] = useState(null);
    const [type, setType] = useState(null);
    const [fileUri, setFileUri] = useState(null);
    const { user } = useAuth();

    // const handlePost = async () => {
    //     const newPostData = {
    //         title,
    //         description,
    //         file: [fileUri],
    //         element,
    //         type,
    //     };

    //     const response = await postService.insertPost(newPostData, user.id);

    //     if (response.success) {
    //         const updateResponse = await userService.updateTotalPosts(user.id);
    //         if (!updateResponse.success) {
    //             Alert.alert("Error", updateResponse.msg || "Could not update total posts. Please try again.");
    //         }

    //         Alert.alert("Success", "Your post has been created!");
    //         setTitle('');
    //         setDescription('');
    //         setFileUri(null);
    //         setElement(null);
    //         setType(null);
    //     } else {
    //         Alert.alert("Error", response.msg || "Could not create post. Please try again.");
    //     }
    // };

    const handlePost = async () => {
        const { success, msg } = await userService.checkTotalPosts(user.id);
        if (!success) {
            Alert.alert("Error", msg || "Không đủ bài viết để đăng. Vui lòng kiểm tra lại.");
            return;
        }

        const newPostData = {
            title,
            description,
            file: [fileUri],
            element,
            type,
        };

        const response = await postService.insertPost(newPostData, user.id);

        if (response.success) {
            const updateResponse = await userService.updateTotalPosts(user.id);

            if (updateResponse.success) {
                Alert.alert("Success", "Bài viết của bạn đã được tạo!");
                setTitle('');
                setDescription('');
                setFileUri(null);
                setElement(null);
                setType(null);

                fetchPosts();
            } else {
                Alert.alert("Error", updateResponse.msg || "Không thể cập nhật số lượng bài viết.");
            }
        } else {
            Alert.alert("Error", response.msg || "Không thể tạo bài viết. Vui lòng thử lại.");
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
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Chọn Loại" value={null} />
                        <Picker.Item label="Hồ cá" value="pond" />
                        <Picker.Item label="Cá Koi" value="koiFish" />
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
