import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { hp, wp } from "@/helper/common";
import { SCREEN } from "@/constants/screen";
import { router } from "expo-router";
import { theme } from "@/constants/theme";
import { signOut } from "@/services/auth/authService";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import Home from ".";
import Notifications from "./notifications";
import AntDesign from "@expo/vector-icons/AntDesign";
import LookupTab from "./(lookup)/_layout";
import Profile from "./profile";
import EditProfile from "./profile/edit-profile";
import PondScreen from "./pond/pond";
import SocialScreen from "./posts";
import BottomNavigation from "@/components/BottomNavigation";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function CustomerLayout() {
  const navigation = useNavigation();
  const { session } = useAuth();

  const alertButtons = [
    {
      text: "Hủy",
      onPress: () => console.log("modal cancel"),
      style: "cancel",
    },
    {
      text: "Đăng xuất",
      onPress: async () => {
        const result = await signOut();
        if (result.success) {
          router.push("/(auth)/login");
        } else {
          console.log(result.error);

          Alert.alert("Đã xảy ra lỗi trong quá trình xử lý");
        }
      },
      style: "destructive",
    },
  ];

  const handleLogout = () =>
    Alert.alert("Xác nhận", "Bạn chắc chắn muốn đăng xuất?", alertButtons);

  return (
    <Drawer.Navigator
      initialRouteName={SCREEN.HOME}
      drawerContent={(props) => {
        const { routeNames, index } = props.state;
        const focused = routeNames[index];

        return (
          <DrawerContentScrollView {...props}>
            <DrawerItem
              label={"Trang chủ"}
              onPress={() => props.navigation.navigate(SCREEN.HOME)}
              focused={focused === SCREEN.HOME}
              activeBackgroundColor="red"
              activeTintColor="white"
            />
            <DrawerItem
              label={"Tư vấn và Tra cứu độ phù hợp"}
              onPress={() => props.navigation.navigate(SCREEN.LOOKUP)}
              focused={focused === SCREEN.LOOKUP}
              activeBackgroundColor="red"
              activeTintColor="white"
            />
            {session ? (
              <DrawerItem
                label={"ĐĂNG XUẤT"}
                onPress={handleLogout}
                inactiveBackgroundColor={theme.colors.roseLight}
                inactiveTintColor={theme.colors.rose}
                labelStyle={{ textAlign: "center" }}
              />
            ) : (
              <DrawerItem
                label={"ĐĂNG NHẬP"}
                onPress={() => router.navigate("/(auth)/login")}
                inactiveBackgroundColor={theme.colors.roseLight}
                inactiveTintColor={theme.colors.rose}
                labelStyle={{ textAlign: "center" }}
              />
            )}
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        headerTitle: () => (
          <View style={styles.header}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require("@/assets/images/logo-ca-Koi.png")}
            />
          </View>
        ),
        headerRight: () =>
          session && (
            <View style={styles.icons}>
              <Pressable onPress={() => navigation.navigate("notifications")}>
                <AntDesign
                  name="hearto"
                  size={hp(3.2)}
                  color={theme.colors.text}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("profile")}>
                <AntDesign
                  name="user"
                  size={hp(3.2)}
                  color={theme.colors.text}
                />
              </Pressable>
            </View>
          ),
      }}
    >
      <Drawer.Screen name={"Main"} component={BottomTab} />
      <Drawer.Screen
        name={SCREEN.PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={SCREEN.EDIT_PROFILE}
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name={SCREEN.POND_SCREEN} component={PondScreen} />
      <Drawer.Screen name={SCREEN.LOOKUP} component={LookupTab} />
      {/* <Drawer.Screen name={SCREEN.NOTIFICATIONS} component={Notifications} /> */}
      {/* <Drawer.Screen name={SCREEN.SOCIAL_SCREEN} component={SocialScreen} /> */}
    </Drawer.Navigator>
  );
}

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN.HOME}
      tabBar={(props) => <BottomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name={SCREEN.HOME} component={Home} />
      <Tab.Screen name={SCREEN.NOTIFICATIONS} component={Notifications} />
      <Tab.Screen name={SCREEN.SOCIAL_SCREEN} component={SocialScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: wp(4), 
    width: "100%", 
  },
  logoImage: {
    width: wp(10), 
  },
  icons: {
    flexDirection: "row",
    gap: wp(5),
  },
});
