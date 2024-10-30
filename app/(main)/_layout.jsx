import React from 'react';  
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';  
import { Alert, Image, StyleSheet, View } from "react-native";  
import { hp, wp } from "@/helper/common";  
import { SCREEN } from "@/constants/screen";  
import { router } from 'expo-router';  
import Home from "./home";  
import Lookup from './lookup/lookup';  
import CheckSuitability from './lookup/check-suitability';  
import Profile from './profile';  
import { FontAwesome } from '@expo/vector-icons';  
import { Tabs } from 'expo-router';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Social from '../social'; 

// Tạo Drawer  
const Drawer = createDrawerNavigator();  

// Định nghĩa styles
const styles = StyleSheet.create({
    logoImage: {
        width: 100,  // Thay đổi kích thước theo nhu cầu
        height: 100, // Thay đổi kích thước theo nhu cầu
    },
});

export default function AppNavigator() {  
    async function signOut() {  
        const { error } = await supabase.auth.signOut();  

        if (error) {  
            Alert.alert("Đã xảy ra lỗi trong quá trình xử lý");  
            return;  
        }  

        router.push('/');  
    }  

    return (  
        <Drawer.Navigator  
            initialRouteName={SCREEN.HOME}  
            drawerContent={(props) => {  
                const { routeNames, index } = props.state;  
                const focused = routeNames[index];  

                return (  
                    <DrawerContentScrollView {...props}>  
                        <DrawerItem  
                            label={'Hồ sơ'}  
                            onPress={() => props.navigation.navigate(SCREEN.PROFILE)}  
                            focused={focused === SCREEN.PROFILE}  
                            activeBackgroundColor='red'  
                            activeTintColor='white'  
                        />  
                        <DrawerItem  
                            label={'Trang chủ'}  
                            onPress={() => props.navigation.navigate(SCREEN.HOME)}  
                            focused={focused === SCREEN.HOME}  
                            activeBackgroundColor='red'  
                            activeTintColor='white'  
                        />  
                        <DrawerItem  
                            label={'Tư vấn cá Koi'}  
                            onPress={() => props.navigation.navigate(SCREEN.LOOKUP)}  
                            focused={focused === SCREEN.LOOKUP}  
                            activeBackgroundColor='red'  
                            activeTintColor='white'  
                        />  
                        <DrawerItem  
                            label={'Tra cứu độ phù hợp'}  
                            onPress={() => props.navigation.navigate(SCREEN.CHECK_SUIT)}  
                            focused={focused === SCREEN.CHECK_SUIT}  
                            activeBackgroundColor='red'  
                            activeTintColor='white'  
                        />  
                        <DrawerItem  
                            label={'ĐĂNG XUẤT'}  
                            onPress={signOut}  
                            inactiveBackgroundColor='#800020'  
                            inactiveTintColor='white'  
                            labelStyle={{ textAlign: "center" }}  
                        />  
                    </DrawerContentScrollView>  
                );  
            }}  
            screenOptions={{  
                headerTitle: () => (  
                    <View>  
                        <Image style={styles.logoImage} resizeMode='contain' source={require('@/assets/images/logo-ca-Koi.png')} />  
                    </View>  
                ),  
            }}  
        >  
            <Drawer.Screen name={SCREEN.HOME} component={Home} />  
            <Drawer.Screen name={SCREEN.LOOKUP} component={Lookup} />  
            <Drawer.Screen name={SCREEN.CHECK_SUIT} component={CheckSuitability} />  
            <Drawer.Screen name={SCREEN.PROFILE} component={Profile} />  
        </Drawer.Navigator>  
    );  
}  

// Tạo BottomNavigation  
const Tab = createBottomTabNavigator();  

const BottomNavigation = () => {  
    return (  
        <Tab.Navigator  
            screenOptions={{  
                tabBarActiveTintColor: '#3AA6B9',  
                tabBarShowLabel: false,  
                tabBarHideOnKeyboard: true,  
                headerShown: false,  
                tabBarStyle: {  
                    position: "absolute",  
                    right: 0,  
                    left: 0,  
                    elevation: 0,  
                    height: 70,  
                },  
            }}  
        >  
            <Tab.Screen  
                name="Home"  
                component={HomeScreen}  
                options={{  
                    title: 'Trang Chủ',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='home' color={color} />,  
                }}  
            />  
            <Tab.Screen  
                name={SCREEN.LOOKUP}  
                component={Lookup}  
                options={{  
                    title: 'Tra Cứu',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='search' color={color} />,  
                }}  
            />  
            <Tab.Screen  
                name="Social"  
                component={Social}  
                options={{  
                    title: 'Xã Hội',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='ellipsis-h' color={color} />,  
                }}  
            />  
            <Tab.Screen  
                name={SCREEN.PROFILE}  
                component={Profile}  
                options={{  
                    title: 'Hồ Sơ',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='user' color={color} />,  
                }}  
            />  
        </Tab.Navigator>  
    );  
};  

export { BottomNavigation };  