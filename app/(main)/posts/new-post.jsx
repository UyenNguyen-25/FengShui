import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Users, ChevronLeft, Lock, Camera, X } from 'lucide-react-native';

const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const popularHashtags = [
    { id: 1, text: '#COVID 3rd Wave', highlighted: true },
    { id: 2, text: '#EB bill' },
    { id: 3, text: '#Tamilnadu' },
    { id: 4, text: '#Bollywood' },
    { id: 5, text: '#IPL' },
    { id: 6, text: '#PMvisit' },
    { id: 7, text: '#Jagame Thandhiram' },
  ];

  const handleImageUpload = (e) => {
    // Xử lý tải lên hình ảnh cho React Native
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <ChevronLeft width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Post</Text>
      </View>

      {/* Post Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder="Create a great post today..."
          multiline
        />
      </View>

      {/* Image Upload Area */}
      <View style={styles.uploadArea}>
        {/* Image Preview Grid */}
        {selectedImages.length > 0 && (
          <View style={styles.imageGrid}>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: image.url }}
                  style={styles.image}
                />
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={styles.removeButton}
                >
                  <X width={16} height={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Upload Button/Drop Zone */}
        <TouchableOpacity style={styles.uploadButton}>
          <Camera width={32} height={32} color="gray" />
          <Text style={styles.uploadText}>Click to upload or drag and drop images here</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button title="Add Location" onPress={() => {}} />
        <Button title="@Add Friends" onPress={() => {}} />
      </View>

      {/* Hashtags Section */}
      <View style={styles.hashtagsSection}>
        <Text style={styles.hashtagsTitle}>Use popular Hashtags for Trending</Text>
        <View style={styles.hashtags}>
          {popularHashtags.map((tag) => (
            <Text
              key={tag.id}
              style={[
                styles.hashtag,
                tag.highlighted ? styles.highlightedHashtag : styles.normalHashtag
              ]}
            >
              {tag.text}
            </Text>
          ))}
        </View>
      </View>

      {/* Post Visibility */}
      <View style={styles.visibilitySection}>
        <Text style={styles.visibilityText}>Post Visibility</Text>
        <Lock width={20} height={20} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  button: { padding: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  inputArea: { padding: 16 },
  textInput: { height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 8 },
  uploadArea: { padding: 16 },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  imageWrapper: { position: 'relative', width: 100, height: 100, margin: 4 },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  removeButton: { position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 16, padding: 4 },
  uploadButton: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ccc', borderRadius: 8, padding: 16 },
  uploadText: { marginTop: 8, color: 'gray' },
  actionButtons: { padding: 16 },
  hashtagsSection: { padding: 16 },
  hashtagsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  hashtags: { flexDirection: 'row', flexWrap: 'wrap' },
  hashtag: { padding: 8, borderRadius: 16, margin: 4 },
  highlightedHashtag: { backgroundColor: 'yellow', color: 'black' },
  normalHashtag: { backgroundColor: '#eee', color: 'gray' },
  visibilitySection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTopWidth: 1, borderTopColor: '#ccc' },
  visibilityText: { fontSize: 16, fontWeight: 'bold' },
});

export default CreatePost;