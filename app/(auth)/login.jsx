import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { hp, wp } from '@/helper/common';
import { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import { router } from 'expo-router';
import { supabase } from '@/utils/supabase';
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({
        email: "",
        password: "",
    })

    const emailRef = useRef("")
    const passwordRef = useRef("")

    async function signInWithEmail(email, password) {
        setIsLoading(true)
        try {
            console.log("sign in ne");
            console.log("email: ", email);
            console.log("password: ", password);

            const { data: { session }, error } = await supabase.auth.signInWithPassword({
                email,
                password,

            })

            if (error) { console.log(error.message) }
            if (session) {
                console.log("session in login: ", session);
                router.push('/')
            }
        } catch (error) {
            console.log('got error at login screen: ', error);
        } finally {
            setIsLoading(false)
        }
    }

    const handlePress = (action) => {
        const email = emailRef.current.trim()
        const password = passwordRef.current.trim()

        switch (action) {
            case "login":
                if (!email || !password) {
                    Alert.alert('Oops', "Vui lòng kiểm tra lại thông tin")
                } else signInWithEmail(email, password)
                break;
            default:
                router.push(action);
        }
    }
    return (
        <ScreenWrapper>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <BackButton size={35} />
                <View>
                    <Text style={styles.welcomeText}>Chào mừng bạn trở lại,</Text>
                </View>
                <View style={styles.form}>
                    <View>
                        <Input
                            icon={<AntDesign name="mail" size={24} color={theme.colors.textLight} />}
                            placeholder='Nhập email của bạn'
                            onChangeText={(value) => emailRef.current = value}
                            onEndEditing={() => {
                                !emailRef.current ? setMessage({ ...message, email: "Email không được để trống" }) : setMessage({ ...message, email: "" })
                            }}
                        />
                        <Text style={[styles.message, { display: !message.email ? "none" : "" }]}>{message.email}</Text>
                    </View>
                    <View>
                        <Input
                            icon={<MaterialIcons name="password" size={24} color={theme.colors.textLight} />}
                            placeholder='Nhập mật khẩu của bạn'
                            secureTextEntry
                            onChangeText={(value) => passwordRef.current = value}
                            onEndEditing={() => { !passwordRef.current ? setMessage({ ...message, password: "Password không được để trống" }) : setMessage({ ...message, password: "" }) }}
                        />
                        <Text style={[styles.message, { display: !message.password ? "none" : "" }]}>{message.password}</Text>
                    </View>

                    <Pressable style={{ alignItems: "flex-end" }} onPress={() => handlePress("forgot_pass")}>
                        <Text style={styles.forgotPassText}>
                            Quên mật khẩu?
                        </Text>
                    </Pressable>

                    <Button
                        title='Đăng nhập'
                        buttonStyle={styles.btn}
                        textStyle={styles.title}
                        onPress={() => handlePress("login")}
                        loading={isLoading} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Bạn chưa có tài khoản?</Text>
                    <Pressable onPress={() => handlePress('signUp')}>
                        <Text style={styles.signUp}>Đăng ký</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        backgroundColor: "white",
        marginHorizontal: wp(5),
        marginVertical: hp(2)
    },
    welcomeText: {
        fontSize: wp(7),
        fontWeight: theme.fonts.semibold,
        marginVertical: hp(6)
    },
    form: {
        gap: 10
    },
    title: {
        color: "white",
        fontSize: hp(2.5),
        textAlign: 'center',
        fontWeight: theme.fonts.semibold
    },
    btn: {
        backgroundColor: "red",
        paddingVertical: hp(1),
        borderRadius: 15
    },
    forgotPassText: {
        fontWeight: theme.fonts.medium
    },
    footer: {
        height: hp(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    footerText: {
        color: theme.colors.textLight
    },
    signUp: {
        color: theme.colors.primary,
        fontWeight: theme.fonts.bold,
        textDecorationLine: "underline"
    },
    message: {
        color: "red",
        marginLeft: 10,
        marginTop: 5
    }
})