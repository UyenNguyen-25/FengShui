import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../(main)/home";
import PondScreen from "../screen/pond";
import EditProfileScreen from "../(main)/profile/EditProfileScreen";
import { BottomNavigation } from "../(main)/_layout";

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
      <Stack.Screen name="Main" component={BottomNavigation} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
