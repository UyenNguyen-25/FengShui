import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Loading from './Loading'
import { theme } from '@/constants/theme'

export default function Button({
    buttonStyle,
    textStyle,
    title = '',
    onPress = () => { },
    loading = false,
    hasShadow = true
}) {

    if (loading) {
        return (
            <View style={[buttonStyle, { backgroundColor: "transparent" }]}>
                <Loading color='red' />
            </View>
        )
    }
    return (
        <Pressable onPress={onPress} style={[buttonStyle, hasShadow && styles.shadowStyle]}>
            <Text style={[textStyle]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: theme.colors.primaryDark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    }
})
