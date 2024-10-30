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

// Tạo Drawer  
const Drawer = createDrawerNavigator();  

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
const BottomNavigation = () => {  
    return (  
        <Tabs  
            screenOptions={{  
                tabBarActiveTintColor: '#3AA6B9'  
            }}  
        >  
            <Tabs.Screen  
                name='home'  
                options={{  
                    title: 'Trang Chủ',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='home' color={color} />  
                }}  
            />  
            <Tabs.Screen  
                name={SCREEN.LOOKUP}  
                options={{  
                    title: 'Tra Cứu',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='search' color={color} />  
                }}  
            />  
            <Tabs.Screen  
                name="social"  
                options={{  
                    title: 'Xã Hội',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='ellipsis-h' color={color} />,  
                }}  
            />  
            <Tabs.Screen  
                name={SCREEN.PROFILE}  
                options={{  
                    title: 'Hồ Sơ',  
                    tabBarIcon: ({ color }) => <FontAwesome size={30} name='user' color={color} />,  
                }}  
            />  
        </Tabs>  
    );  
};  

// Thêm dòng này để sử dụng BottomNavigation
export { BottomNavigation };

const styles = StyleSheet.create({  
    logoImage: {  
        height: hp(10),  
        width: wp(20),  
        justifyContent: "center",  
        alignContent: "center"  
    },  
});