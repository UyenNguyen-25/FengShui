import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Lookup from './lookup'
import CheckSuitability from './check-suitability'
import { theme } from '@/constants/theme'

const Tab = createBottomTabNavigator()

const LookupTab = () => {
    return (
        <Tab.Navigator initialRouteName='lookup'
            screenOptions={{
                headerShown: false,
                tabBarIconStyle: { display: "none" },
            }}
            tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name='Tra cứu' component={Lookup} />
            <Tab.Screen name="Kiểm tra" component={CheckSuitability} />
        </Tab.Navigator>
    )
}

export default LookupTab

function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            shadowColor: theme.colors.primaryDark,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, padding: 15 }}
                        key={index}
                    >
                        <Text style={{ color: isFocused ? 'red' : '#222', textAlign: 'center' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({})