import React from 'react'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function ScreenWrapper({ children, bg = 'white' }) {

    const { top } = useSafeAreaInsets()
    const paddingTop = top > 0 ? top + 5 : 30

    return (
        <ScrollView style={{ flex: 1, paddingTop, backgroundColor: bg }}>
            {children}
        </ScrollView>
    )
}

export default ScreenWrapper