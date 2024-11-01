import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { hp } from '@/helper/common'
import { theme } from '@/constants/theme'
import { useAuth } from '@/hooks/useAuth'
import React, { useState } from 'react'
import { userService } from '@/services/users/userService'
import { elements, gender } from '@/constants/enLocale'
import { RadioButton } from 'react-native-paper'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import AntDesign from '@expo/vector-icons/AntDesign'
import Button from '@/components/Button'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
import { viElement, viGender } from '@/constants/viLocale'
import { useNavigation } from '@react-navigation/native'

const EditProfile = () => {
    const { user, refreshAuthUser } = useAuth()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [newData, setNewData] = useState({
        name: user.name,
        gender: user.gender || 0,
        date_of_birth: new Date(user.date_of_birth),
        element: user.element,
        total_post: user.total_post
    })
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        let userData = { ...newData }
        let { name, date_of_birth, element } = userData

        // console.log(user?.id);
        if (!name || !date_of_birth || !element) {
            Alert.alert("Thông tin tài khoản", "Vui lòng không bỏ trống")
            return
        }
        setLoading(true)

        const { success, data } = await userService.updateUser(user?.id, userData)

        if (success) {
            await refreshAuthUser()
            navigation.navigate("profile")
        }

        setLoading(false)

        console.log('update user result: ', data);
    }

    const onChange = ({ type }, selectedData) => {
        // console.log(type);
        if (type === "set") {
            const currentDate = selectedData
            setNewData({ ...newData, date_of_birth: currentDate })
        } else setOpen(false)
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backBtn}>
                        <BackButton size={hp(4)} />
                    </View>
                    <Text style={styles.title}>Chỉnh sửa thông tin</Text>
                </View>
                <View style={styles.form}>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text style={styles.labelText}>Họ và tên</Text>
                        <Input
                            icon={<AntDesign name='user' size={20} color={theme.colors.textLight} />}
                            placeholder='Họ và tên'
                            onChangeText={(e) => setNewData({ ...newData, name: e })}
                            value={newData.name}
                        />
                    </View>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text style={styles.labelText}>Giới tính</Text>
                        <RadioButton.Group
                            onValueChange={newValue => {
                                const enValue = gender[newValue]
                                console.log(enValue);

                                setNewData({ ...newData, gender: enValue })
                            }}
                            value={viGender[newData.gender]}

                        >
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                <View style={styles.radioItem}>
                                    <RadioButton value="Nam" color='red' />
                                    <Text>Nam</Text>
                                </View>
                                <View style={styles.radioItem}>
                                    <RadioButton value="Nữ" color='red' />
                                    <Text>Nữ</Text>
                                </View>
                                <View style={styles.radioItem}>
                                    <RadioButton value="Khác" color='red' />
                                    <Text>Khác</Text>
                                </View>


                            </View>
                        </RadioButton.Group>
                    </View>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text style={styles.labelText}>Ngày sinh</Text>
                        <Pressable onPress={() => { setOpen(!open) }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    height: hp(6.5),
                                    alignItems: "center",
                                    borderWidth: 0.4,
                                    borderColor: theme.colors.text,
                                    borderRadius: theme.radius.xxl,
                                    borderCurve: "continuous",
                                    paddingHorizontal: 18,
                                    gap: 12,
                                }}
                            >
                                <AntDesign name='calendar' size={20} color={theme.colors.textLight} />
                                <Text>{moment(newData.date_of_birth).format("DD/MM/YYYY")}</Text>
                            </View>
                        </Pressable>
                        {open && <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={newData.date_of_birth}
                            maximumDate={new Date()}
                            onChange={onChange}
                            positiveButton={{
                                label: "xác nhận",
                                textColor: 'red'
                            }}
                            negativeButton={{
                                label: "Đóng",
                                textColor: theme.colors.textLight
                            }}
                            on
                        />}
                    </View>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text style={styles.labelText}>Mệnh</Text>

                        <SelectDropdown
                            data={[
                                "Kim",
                                "Mộc",
                                "Thủy",
                                "Hỏa",
                                "Thổ"
                            ]}
                            onSelect={(selectedItem) => {
                                const enSelectedItem = elements[selectedItem]
                                console.log(enSelectedItem);
                                setNewData({ ...newData, element: enSelectedItem })
                            }}
                            renderButton={(isOpened) => {
                                const viSelectedItem = viElement[newData.element]

                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(viSelectedItem) || 'Vui lòng chọn mệnh'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View key={index} style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Button
                        title='Lưu thay đổi'
                        buttonStyle={styles.btn}
                        textStyle={styles.btnTxt}
                        onPress={handleSubmit}
                        loading={loading} />
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: hp(3),
        paddingBottom: hp(10)
    },
    header: {
        height: hp(5),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    backBtn: {
        position: "absolute",
        left: 0
    },
    title: {
        fontSize: hp(3),
        fontWeight: theme.fonts.bold
    },
    form: {
        width: "100%",
        alignItems: 'center',
        gap: 20,
        marginTop: 20

    },
    dropdownButtonStyle: {
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    inputContainer: {
        width: "100%",
        gap: 10
    },
    footer: {},
    btn: {
        backgroundColor: "red",
        paddingVertical: hp(2),
        borderRadius: 15
    },
    btnTxt: {
        fontSize: hp(2.5),
        fontWeight: theme.fonts.semibold,
        color: "white",
        textAlign: "center"
    },
    radioItem: {
        alignItems: "center",
        flexDirection: "row",
        gap: 2
    },
    labelText: {
        fontSize: hp(2.5),
        fontWeight: theme.fonts.bold
    }
})