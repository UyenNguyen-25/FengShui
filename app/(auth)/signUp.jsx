import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import { supabase } from "@/utils/supabase";
import { hp, wp } from "@/helper/common";
import { theme } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordAgainRef = useRef("");

  async function signUpWithEmail(name, email, password) {
    setIsLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          email,
        },
      },
    });

    console.log("sign up", session);

    if (error) {
      console.log("====================================");
      console.log(error.message);
      console.log("====================================");
      Alert.alert("Đã có lỗi trong quá trình xử lý");
      setIsLoading(false);
      return;
    }

    router.push("/congratulation");

    setIsLoading(false);
  }

  const handlePress = (action) => {
    const fullName = fullNameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();
    const passwordAgain = passwordAgainRef.current.trim();

    if (action === "signUp") {
      if (!fullName || !email || !password || password !== passwordAgain) {
        Alert.alert("Oops", "Vui lòng kiểm tra lại thông tin");
      } else signUpWithEmail(fullName, email, password);
    } else router.push(action);
  };

  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton size={35} />
        <View>
          <Text style={styles.welcomeText}>Đăng ký tài khoản</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Input
              icon={
                <AntDesign
                  name="user"
                  size={24}
                  color={theme.colors.textLight}
                />
              }
              placeholder="Nhập họ và tên của bạn"
              onChangeText={(value) => (fullNameRef.current = value)}
              onEndEditing={() => {
                !fullNameRef.current
                  ? setMessage({
                      ...message,
                      fullName: "Họ và tên không được để trống",
                    })
                  : setMessage({ ...message, fullName: "" });
              }}
            />
            <Text
              style={[
                styles.message,
                { display: !message.fullName ? "none" : "" },
              ]}
            >
              {message.fullName}
            </Text>
          </View>
          <View>
            <Input
              icon={
                <AntDesign
                  name="mail"
                  size={24}
                  color={theme.colors.textLight}
                />
              }
              placeholder="Nhập email của bạn"
              onChangeText={(value) => (emailRef.current = value)}
              onEndEditing={() => {
                !emailRef.current
                  ? setMessage({
                      ...message,
                      email: "Email không được để trống",
                    })
                  : setMessage({ ...message, email: "" });
              }}
            />
            <Text
              style={[
                styles.message,
                { display: !message.email ? "none" : "" },
              ]}
            >
              {message.email}
            </Text>
          </View>
          <View>
            <Input
              icon={
                <MaterialIcons
                  name="password"
                  size={24}
                  color={theme.colors.textLight}
                />
              }
              placeholder="Nhập mật khẩu của bạn"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
              onEndEditing={() => {
                !passwordRef.current
                  ? setMessage({
                      ...message,
                      password: "Password không được để trống",
                    })
                  : setMessage({ ...message, password: "" });
              }}
            />
            <Text
              style={[
                styles.message,
                { display: !message.password ? "none" : "" },
              ]}
            >
              {message.password}
            </Text>
          </View>
          <View>
            <Input
              icon={
                <MaterialIcons
                  name="password"
                  size={24}
                  color={theme.colors.textLight}
                />
              }
              placeholder="Nhập lại mật khẩu của bạn"
              secureTextEntry
              onChangeText={(value) => (passwordAgainRef.current = value)}
              onEndEditing={() => {
                !passwordAgainRef.current ||
                passwordAgainRef.current.length === 0
                  ? setMessage({
                      ...message,
                      passwordAgain: "Vui lòng nhập lại mật khẩu phía trên",
                    })
                  : passwordAgainRef.current !== passwordRef.current
                  ? setMessage({
                      ...message,
                      passwordAgain: "Mật khẩu nhập lại không khớp",
                    })
                  : setMessage({ ...message, passwordAgain: "" });
              }}
            />
            <Text
              style={[
                styles.message,
                { display: !message.passwordAgain ? "none" : "" },
              ]}
            >
              {message.passwordAgain}
            </Text>
          </View>
          <Button
            title="Đăng ký"
            buttonStyle={styles.btn}
            textStyle={styles.title}
            onPress={() => handlePress("signUp")}
            loading={isLoading}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Bạn đã có tài khoản?</Text>
          <Pressable onPress={() => handlePress("login")}>
            <Text style={styles.signIn}>Đăng nhập</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  welcomeText: {
    fontSize: wp(7),
    fontWeight: theme.fonts.semibold,
    marginVertical: hp(6),
  },
  form: {
    gap: 10,
  },
  title: {
    color: "white",
    fontSize: hp(2.5),
    textAlign: "center",
    fontWeight: theme.fonts.semibold,
  },
  btn: {
    backgroundColor: "red",
    paddingVertical: hp(1),
    borderRadius: 15,
  },
  forgotPassText: {
    fontWeight: theme.fonts.medium,
  },
  footer: {
    height: hp(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
    color: theme.colors.textLight,
  },
  signIn: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.bold,
    textDecorationLine: "underline",
  },
  message: {
    color: "red",
    marginLeft: 10,
    marginTop: 5,
  },
});
