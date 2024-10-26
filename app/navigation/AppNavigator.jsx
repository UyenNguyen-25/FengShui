import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../(main)/home";
import PondScreen from "../screen/pond";
import EditProfileScreen from "../(main)/profile/EditProfileScreen";;

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pond" component={PondScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Chỉnh sửa hồ sơ" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
