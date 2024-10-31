import { Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';

const BackButton = ({ size = 24, color }) => {
    return (
        <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left-circle" size={size} color={color || '#0000006e'} />
        </Pressable>
    )
}

export default BackButton