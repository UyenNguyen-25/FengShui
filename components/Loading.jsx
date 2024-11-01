import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Loading(
    { size = "large", color = "red" }
) {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}
