import React, { useState } from 'react';
import { View, Text, TextInput, Picker, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CloudUpload } from 'lucide-react-native';
import { insertBlog } from '@/services/blog/blogService';

const BlogCreateForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [suitElement, setSuitElement] = useState('fire');
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    const newData = {
      title,
      description,
      file: file ? file.uri : null,
      element: suitElement,
      koi_id: null,
      pond_id: null,
    };

    const userId = 1;

    try {
      const response = await insertBlog(newData, userId);
      if (response.success) {
        Alert.alert("Success", "Blog created successfully!");
      } else {
        Alert.alert("Error", response.msg);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
      console.error("Error creating blog:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Suit Element:</Text>
        <Picker
          style={styles.picker}
          selectedValue={suitElement}
          onValueChange={(value) => setSuitElement(value)}
        >
          <Picker.Item label="Fire" value="fire" />
          <Picker.Item label="Water" value="water" />
          <Picker.Item label="Wood" value="wood" />
          <Picker.Item label="Earth" value="earth" />
          <Picker.Item label="Metal" value="metal" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.fileInput}>
        {file ? (
          <Text style={styles.fileText}>{file.name || file.uri}</Text>
        ) : (
          <View style={styles.fileContainer}>
            <CloudUpload color="white" size={24} />
            <Text style={styles.fileText}>Add File</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Create Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EA4335',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: 'white',
    marginRight: 12,
  },
  picker: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  fileInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileText: {
    color: '#333',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#F7B733',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BlogCreateForm;