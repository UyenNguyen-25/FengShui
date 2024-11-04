import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Modal, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { packageService } from '../../../services/package/packageService';
import { useAuth } from '@/hooks/useAuth'
import { userService } from '../../../services/users/userService';
import { hp } from '@/helper/common';

const PackageScreen = ({ navigation }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPackages = async () => {
      const { success, data } = await packageService.getAll();
      if (success) {
        setPackages(data);
      } else {
        console.error("Failed to fetch packages:", data);
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
    setModalVisible(true);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = async () => {
    // Validate input
    if (inputValue.length !== 11 || !/^\d{11}$/.test(inputValue)) {
      alert('Vui lòng nhập 11 chữ số.');
      return;
    }

    const userId = user.id; // Get the user's ID

    // Use the number of posts from the selected package for the increment
    const incrementBy = selectedPackage.num_of_post;

    // Update the user's total_of_post
    const result = await userService.updateNumOfPost(userId, incrementBy); // Pass incrementBy
    console.log('result', result);
    if (result.success) {
      alert('Cập nhật số bài viết thành công!');
    } else {
      alert('Cập nhật số bài viết thất bại: ' + result.msg);
    }

    // After updating, close the modal
    setModalVisible(false);
    setInputValue('');
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ff4040" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {packages.map((pkg) => (
          <View key={pkg.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{pkg.name === "Normal" ? "Gói thường" : "Gói VIP"}</Text>
              <View style={styles.subtitle}>
                <Text style={styles.subtitleText}>
                  Giá: {pkg.price} VND - Số bài viết: {pkg.num_of_post}
                </Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="post-add" size={hp(6)} color="black" />
                {/* <View style={styles.starContainer}>
                  <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
                  <FontAwesome5 name="star" size={12} color="#333" solid style={styles.star} />
                  <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
                </View> */}
              </View>
              <TouchableOpacity style={styles.button} onPress={() => handlePurchase(pkg)}>
                <Text style={styles.buttonText}>Mua ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Modal for entering 11-digit number */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Nhập 11 chữ số:</Text>
              <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={handleInputChange}
                keyboardType="numeric"
                maxLength={11}
              />
              <View style={styles.buttonContainer}>
                <Button title="Xác nhận" onPress={handleSubmit} color="#ff4040" />
                <Button title="Hủy" onPress={() => setModalVisible(false)} color="gray" />
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  cardHeader: {
    marginBottom: 16,
  },
  title: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: hp(2),
    color: '#666',
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  star: {
    marginHorizontal: 2,
  },
  button: {
    backgroundColor: '#ff4040',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Adds a dark, semi-transparent background
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '80%',  // Adjust width to make it more centered and smaller
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default PackageScreen;
