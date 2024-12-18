import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { hp, wp } from "@/helper/common";
import { SCREEN } from "@/constants/screen";
import { Redirect, router } from "expo-router";
import { theme } from "@/constants/theme";
import { signOut } from "@/services/auth/authService";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import Home from ".";
import AntDesign from "@expo/vector-icons/AntDesign";
import LookupTab from "./(lookup)/_layout";
import Profile from "./profile";
import EditProfile from "./profile/edit-profile";
import PondScreen from "./pond/pond";
import SocialScreen from "./posts";
import BottomNavigation from "@/components/BottomNavigation";
import PostScreen from "./posts/PostScreen";
import FengShuiScreen from "./fengshui";
import NotificationScreen from "./(notifications)";
import PackageScreen from "./package";
import PondDetail from "./pond/pond-detail";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import FishCare from "./FishCare";
import BlogDetail from "./BlogDetail";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function CustomerLayout() {
  const navigation = useNavigation();
  const { session, user } = useAuth();

  useEffect(() => {
    if (user && user.role === "admin") {
      return <Redirect href={"/(admin)"} />;
    }
  }, []);

  const alertButtons = [
    {
      text: "Hủy",
      onPress: () => console.log("modal cancel"),
      style: "cancel",
    },
    {
      text: "Đăng xuất",
      onPress: async () => {
        const { success, error } = await signOut();
        if (success) {
          router.navigate("/(auth)/login");
        } else {
          console.log(error);

          Alert.alert("Đã xảy ra lỗi trong quá trình xử lý");
        }
      },
      style: "destructive",
    },
  ];

  const handleLogout = () =>
    Alert.alert("Xác nhận", "Bạn chắc chắn muốn đăng xuất?", alertButtons);

  return (
    <>
      <StatusBar style="dark" />
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
              <DrawerItem
                label={"Quản lý bài viết"}
                onPress={() => props.navigation.navigate(SCREEN.MANAGER_BLOG)}
                focused={focused === SCREEN.MANAGER_BLOG}
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
                  style={{ marginTop: 50 }}
                />
              ) : (
                <DrawerItem
                  label={"ĐĂNG NHẬP"}
                  onPress={() => router.navigate("/(auth)/login")}
                  inactiveBackgroundColor={theme.colors.roseLight}
                  inactiveTintColor={theme.colors.rose}
                  labelStyle={{ textAlign: "center" }}
                  style={{ marginTop: 50 }}
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
                <Pressable
                  onPress={() => navigation.navigate(SCREEN.PACKAGE_SCREEN)}
                >
                  <AntDesign
                    name="gift"
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
        <Drawer.Screen name={SCREEN.LOOKUP} component={LookupTab} />
        <Drawer.Screen name={SCREEN.POND_SCREEN} component={PondScreen} />
        <Drawer.Screen name={SCREEN.POND_DETAIL} component={PondDetail} options={{ headerShown: false }} />
        <Drawer.Screen name={SCREEN.POST_SCREEN} component={PostScreen} />
      </Drawer.Navigator>
    </>
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
      <Tab.Screen
        name={SCREEN.NOTIFICATION_SCREEN}
        component={NotificationScreen}
      />
      <Tab.Screen name={SCREEN.SOCIAL_SCREEN} component={SocialScreen} />
      <Tab.Screen name={SCREEN.FENGSHUI_SCREEN} component={FengShuiScreen} />
      <Tab.Screen name={SCREEN.POND_SCREEN} component={PondScreen} />
      <Tab.Screen name={SCREEN.POND_DETAIL} component={PondDetail} />
      <Tab.Screen name={SCREEN.POST_SCREEN} component={PostScreen} />
      <Tab.Screen name={SCREEN.PACKAGE_SCREEN} component={PackageScreen} />
      <Tab.Screen name={SCREEN.FISHCARE} component={FishCare} />
      <Tab.Screen name={SCREEN.BLOG_DETAIL} component={BlogDetail} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  logoImage: {
    flex: 1,
  },
  icons: {
    paddingRight: wp(2),
    flexDirection: "row",
    gap: 15,
  },
});
