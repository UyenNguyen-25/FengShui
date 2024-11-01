import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '@/constants/screen';

const FengShuiScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Card 1 - Tư vấn cá Koi */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>Tư vấn & Tra cứu cá Koi theo mệnh</Text>
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText}>
                Chọn cá Koi phù hợp với mệnh của bạn
              </Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="yin-yang" size={50} color="#333" />
              <View style={styles.starContainer}>
                <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
                <FontAwesome5 name="star" size={12} color="#333" solid style={styles.star} />
                <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(SCREEN.LOOKUP)}>
              <Text style={styles.buttonText}>Bắt đầu</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="koi" size={50} color="#333" />
              <View style={styles.starContainer}>
                <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
                <FontAwesome5 name="star" size={12} color="#333" solid style={styles.star} />
                <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(SCREEN.LOOKUP)}>
              <Text style={styles.buttonText}>Tư vấn</Text>
            </TouchableOpacity>
          </View> */}
          {/* 
          <View style={styles.cardFooter}>
            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>50</Text>
              <FontAwesome5 name="bolt" size={16} color="#333" />
            </View>
            <TouchableOpacity>
              <FontAwesome5 name="info-circle" size={24} color="#333" />
            </TouchableOpacity>
          </View> */}
        </View>

        {/* Card 2 - Tra cứu độ phù hợp */}
        {/* <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>Tra cứu độ phù hợp</Text>
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText}>
                Xem xét mức độ tương hợp của bạn
              </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="yin-yang" size={50} color="#333" />
              <View style={styles.starContainer}>
                <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
                <FontAwesome5 name="star" size={12} color="#333" solid style={styles.star} />
                <FontAwesome5 name="star" size={8} color="#333" solid style={styles.star} />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(SCREEN.CHECK_SUIT)}>
              <Text style={styles.buttonText}>Tra cứu</Text>
            </TouchableOpacity>
          </View> */}
          {/* 
          <View style={styles.cardFooter}>
            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>50</Text>
              <FontAwesome5 name="bolt" size={16} color="#333" />
            </View>
            <TouchableOpacity>
              <FontAwesome5 name="info-circle" size={24} color="#333" />
            </TouchableOpacity>
          </View> */}
        {/* </View> */}
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
    padding: 16,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //   cardFooter: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },
  //   pointContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     gap: 4,
  //   },
  //   pointText: {
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //     color: '#333',
  //   },
});

export default FengShuiScreen;