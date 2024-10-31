import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { hp } from '@/helper/common'
import { theme } from '@/constants/theme'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/auth/authService'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton'
import AntDesign from '@expo/vector-icons/AntDesign'
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { router, useNavigation } from 'expo-router'

const Profile = () => {
  const navigation = useNavigation()
  const { user } = useAuth()

  const alertButtons = [
    {
      text: 'Hủy',
      onPress: () => console.log('modal cancel'),
      style: 'cancel',
    },
    {
      text: 'Đăng xuất',
      onPress: async () => {
        const result = await signOut()
        if (result.success) {
          router.push("/(auth)/login")
        } else {
          console.log(result.error);

          Alert.alert("Đã xảy ra lỗi trong quá trình xử lý")
        }
      },
      style: 'destructive'
    }
  ]

  const handleLogout = async () => Alert.alert('Xác nhận', 'Bạn chắc chắn muốn đăng xuất?', alertButtons)

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
          <View >
            <View style={{ borderWidth: 1, borderRadius: theme.radius.xl, borderColor: theme.colors.textLight, marginHorizontal: 6, marginBottom: 6 }}>
              <Image style={styles.avatar} source={require('@/assets/images/avatar.png')} />
            </View>
            <Pressable
              style={[styles.shadowStyle, { position: 'absolute', right: 0, bottom: 0, backgroundColor: 'white', borderRadius: 50, padding: 3 }]}
              onPress={() => navigation.navigate('edit-profile')}
            >
              <Feather name="edit-3" size={18} color="black" />
            </Pressable>
          </View>
          {/* username, email */}
          <View style={{ alignItems: "center", gap: 2 }}>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          {/* phone */}
          {user && user.phone &&
            <View style={styles.info}>
              <AntDesign name="phone" size={24} color={theme.colors.textLight} />
              <Text style={styles.infoTxt}>{user.phone}</Text>
            </View>}

          {/* date of birth*/}
          {user && user.date_of_birth &&
            <View style={styles.info}>
              <AntDesign name="calendar" size={24} color={theme.colors.textLight} />
              <Text style={styles.infoTxt}>{user.phone}</Text>
            </View>}

          {/* element*/}
          {user && user.element &&
            <View style={styles.info}>
              {user.element === "Hỏa" ? <Fontisto name="fire" size={24} color={theme.colors.textLight} />
                : user.element === "Thủy" ? <Entypo name="water" size={24} color={theme.colors.textLight} />
                  : user.element === 'Thổ' ? <FontAwesome5 name="mountain" size={24} color={theme.colors.textLight} />
                    : user.element === "Mộc" ? <Entypo name="tree" size={24} color={theme.colors.textLight} />
                      : <MaterialCommunityIcons name="gold" size={24} color={theme.colors.textLight} />}
              <Text style={styles.infoTxt}>{user.menh}</Text>
            </View>}
        </View>
      </View>
    </ScreenWrapper >
  )
}

export default Profile

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
    alignItems: "center",
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
    gap: 10
  },
  infoTxt: {
    color: theme.colors.roseLight
  },
  shadowStyle: {
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8
  }
})