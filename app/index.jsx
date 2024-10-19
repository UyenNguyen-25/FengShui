import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helper/common'
import { theme } from '@/constants/theme'
import Button from '@/components/Button'
import { Redirect, router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Loading from '@/components/Loading'

const Index = () => {
    const { session, mounting } = useAuth()

    const handlePress = (action) => {
        return router.push(action)
    }

    return (
        <ScreenWrapper bg={'white'}>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <Image style={styles.logoImage} resizeMode='contain' source={require('../assets/images/logo-ca-Koi.png')} />
                <View style={styles.footer}>
                    {mounting ? <Loading color='red' /> :
                        !session ?
                            <>
                                <Button title='Khám Phá Ngay !' buttonStyle={styles.btn} textStyle={styles.title} onPress={() => handlePress('signUp')} />
                                <View style={styles.bottomTextFooter}>
                                    <Text style={styles.txt}>Đã có tài khoản!</Text>
                                    <Pressable onPress={() => handlePress('login')}><Text style={[styles.txt, styles.loginText]}>Đăng nhập</Text></Pressable>
                                </View>
                            </> :
                            <Redirect href={"/(main)/home"} />}
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        marginHorizontal: wp(4)
    },
    logoImage: {
        height: hp(50),
        width: wp(200),
        alignSelf: "center",
    },
    title: {
        color: "white",
        fontSize: hp(3),
        textAlign: 'center',
        fontWeight: theme.fonts.bold
    },
    btn: {
        backgroundColor: "red",
        paddingVertical: hp(1),
        borderRadius: 15
    },
    footer: {
        gap: 30,
        marginBottom: hp(15),
        width: "100%"
    },
    bottomTextFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    txt: {
        fontSize: hp(2)
    },
    loginText: {
        color: theme.colors.primary,
        fontWeight: theme.fonts.bold,
        textDecorationLine: "underline"
    }
})