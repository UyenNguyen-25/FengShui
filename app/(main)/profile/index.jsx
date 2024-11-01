// Import remaining necessary packages
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { hp } from '@/helper/common';
import { theme } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/services/auth/authService';
import { router, useNavigation } from 'expo-router';
import { viElement, viGender } from '@/constants/viLocale';
import { useEffect } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import BackButton from '@/components/BackButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import moment from 'moment';

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  // Logout confirmation buttons
  const alertButtons = [
    {
      text: 'Hủy',
      onPress: () => console.log('modal cancel'),
      style: 'cancel',
    },
    {
      text: 'Đăng xuất',
      onPress: async () => {
        const result = await signOut();
        if (result.success) {
          router.push("/(auth)/login");
        } else {
          console.log(result.error);
          Alert.alert("Đã xảy ra lỗi trong quá trình xử lý");
        }
      },
      style: 'destructive'
    }
  ];

  const handleLogout = async () => Alert.alert('Xác nhận', 'Bạn chắc chắn muốn đăng xuất?', alertButtons);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backBtn}>
            <BackButton size={hp(4)} />
          </View>
          <View>
            <Text style={[styles.title]}>Thông tin tài khoản</Text>
          </View>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <AntDesign name="logout" size={hp(2.5)} color={theme.colors.rose} />
          </Pressable>
        </View>

        {/* User Information */}
        <View style={styles.infoContainer}>
          {/* Avatar */}
          <View style={{ alignSelf: "center" }}>
            <View style={{ borderWidth: 1, borderRadius: theme.radius.xl, borderColor: theme.colors.textLight, marginHorizontal: 6, marginBottom: 6 }}>
              <Image style={styles.avatar} source={require('@/assets/images/avatar.png')} />
            </View>
            <Pressable
              style={[styles.shadowStyle, { position: 'absolute', right: 0, bottom: 0, backgroundColor: 'white', borderRadius: 50, padding: 4 }]}
              onPress={() => navigation.navigate('edit-profile')}
            >
              <Feather name="edit-3" size={18} color={theme.colors.textLight} />
            </Pressable>
          </View>

          {/* Username and Email */}
          <View style={{ alignItems: "center", gap: 2 }}>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          {/* Gender */}
          {user && (
            <View style={styles.info}>
              <FontAwesome name="transgender" size={24} color={theme.colors.textLight} />
              <Text style={styles.infoTxt}>{viGender[user.gender]}</Text>
            </View>
          )}

          {/* Date of Birth */}
          {user && user.date_of_birth && (
            <View style={styles.info}>
              <AntDesign name="calendar" size={24} color={theme.colors.textLight} />
              <Text style={styles.infoTxt}>{moment(user.date_of_birth).format('DD/MM/YYYY')}</Text>
            </View>
          )}

          {/* Element */}
          {user && user.element && (
            <View style={styles.info}>
              {user.element === "fire" ? <Fontisto name="fire" size={24} color={theme.colors.textLight} />
                : user.element === "water" ? <Entypo name="water" size={24} color={theme.colors.textLight} />
                  : user.element === 'earth' ? <FontAwesome5 name="mountain" size={24} color={theme.colors.textLight} />
                    : user.element === "wood" ? <Entypo name="tree" size={24} color={theme.colors.textLight} />
                      : <MaterialCommunityIcons name="gold" size={24} color={theme.colors.textLight} />}
              <Text style={styles.infoTxt}>{viElement[user.element]}</Text>
            </View>
          )}

          {/* Remaining Post Count */}
          {user && (
            <View style={styles.info}>
              <FontAwesome name="sticky-note" size={24} color={theme.colors.textLight} />
              <Text style={styles.infoTxt}>Số lượng bài viết còn lại: {user.total_post}</Text>
            </View>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hp(3),
  },
  header: {
    height: hp(5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    left: 0
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3),
    textAlign: 'center',
    fontWeight: theme.fonts.bold
  },
  logoutBtn: {
    backgroundColor: theme.colors.roseLight,
    padding: 6,
    borderRadius: theme.radius.md,
    position: "absolute",
    right: 0
  },
  infoContainer: {
    marginVertical: hp(5),
    gap: 10
  },
  avatar: {
    width: hp(15),
    height: hp(12),
    marginTop: hp(2)
  },
  username: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
  },
  email: {
    color: theme.colors.textLight
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: hp(3)
  },
  infoTxt: {
    color: theme.colors.textLight
  },
  shadowStyle: {
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8
  }
});
