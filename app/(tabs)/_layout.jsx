import { Stack, Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="lookup" options={{
                tabBarLabel: "Tư vấn",
            }} />
            <Tabs.Screen name="check-suitability" options={{
                tabBarLabel: "Tra cứu",
            }} />
        </Tabs>
    );
}
