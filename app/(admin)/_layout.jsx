import { View, Text, Alert } from 'react-native'
import React from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { SCREEN } from '@/constants/screen';
import { router } from 'expo-router';
import { signOut } from '@/services/auth/authService';
import { theme } from '@/constants/theme';
import { hp } from '@/helper/common';
import { StatusBar } from 'expo-status-bar';
import Dashboard from '.';
import KoiManagement from './koi-management';
import PondManagement from './pond-management';
import UserManagement from './user-management';
import PackageManagement from './package-management';
import PostManagement from './post-management';

const Drawer = createDrawerNavigator();

const AdminLayout = () => {
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
                    router.navigate('/(auth)/login')
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
                initialRouteName={SCREEN.DASHBOARD}
                drawerContent={(props) => {
                    const { routeNames, index } = props.state;
                    const focused = routeNames[index];

                    return (
                        <DrawerContentScrollView {...props}>
                            <DrawerItem
                                label={'Dashboard'}
                                onPress={() => props.navigation.navigate(SCREEN.DASHBOARD)}
                                focused={focused === SCREEN.DASHBOARD}
                                activeBackgroundColor='red'
                                activeTintColor='white'
                            />
                            <DrawerItem
                                label={'Koi Management'}
                                onPress={() => props.navigation.navigate(SCREEN.KOI_MANAGEMENT)}
                                focused={focused === SCREEN.KOI_MANAGEMENT}
                                activeBackgroundColor='red'
                                activeTintColor='white'
                            />
                            <DrawerItem
                                label={'Pond Management'}
                                onPress={() => props.navigation.navigate(SCREEN.POND_MANAGEMENT)}
                                focused={focused === SCREEN.POND_MANAGEMENT}
                                activeBackgroundColor='red'
                                activeTintColor='white'
                            />
                            <DrawerItem
                                label={'User Management'}
                                onPress={() => props.navigation.navigate(SCREEN.USER_MANAGEMENT)}
                                focused={focused === SCREEN.USER_MANAGEMENT}
                                activeBackgroundColor='red'
                                activeTintColor='white'
                            />
                            <DrawerItem
                                label={'Package Management'}
                                onPress={() => props.navigation.navigate(SCREEN.PACKAGE_MANAGEMENT)}
                                focused={focused === SCREEN.PACKAGE_MANAGEMENT}
                                activeBackgroundColor='red'
                                activeTintColor='white'
                            />
                            <DrawerItem
                                label={'Post Management'}
                                onPress={() => props.navigation.navigate(SCREEN.POST_MANAGEMENT)}
                                focused={focused === SCREEN.POST_MANAGEMENT}
                                activeBackgroundColor='red'
                                activeTintColor='white'
                            />
                            <DrawerItem
                                label={'LOG OUT'}
                                onPress={handleLogout}
                                inactiveBackgroundColor={theme.colors.roseLight}
                                inactiveTintColor={theme.colors.rose}
                                labelStyle={{ textAlign: "center" }}
                                style={{ marginTop: 50 }}
                            />
                        </DrawerContentScrollView>
                    )
                }}
                screenOptions={{
                    drawerLabelStyle: { textAlign: "center" },
                    headerTitleStyle: { fontSize: hp(2.3) }
                }}
            >
                <Drawer.Screen name={SCREEN.DASHBOARD} component={Dashboard}
                    options={{ headerTitle: "Dashboard" }} />
                <Drawer.Screen name={SCREEN.KOI_MANAGEMENT} component={KoiManagement}
                    options={{ headerTitle: "Koi Management" }} />
                <Drawer.Screen name={SCREEN.POND_MANAGEMENT} component={PondManagement}
                    options={{ headerTitle: "Pond Management" }} />
                <Drawer.Screen name={SCREEN.USER_MANAGEMENT} component={UserManagement}
                    options={{ headerTitle: "User Management" }} />
                <Drawer.Screen name={SCREEN.PACKAGE_MANAGEMENT} component={PackageManagement}
                    options={{ headerTitle: "Package Management" }} />
                <Drawer.Screen name={SCREEN.POST_MANAGEMENT} component={PostManagement}
                    options={{ headerTitle: "Post Management" }} />

            </Drawer.Navigator>
        </>
    )
}

export default AdminLayout