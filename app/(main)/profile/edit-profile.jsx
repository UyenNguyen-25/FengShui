import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton'
import { hp } from '@/helper/common'
import { theme } from '@/constants/theme'
import Input from '@/components/Input'
import { updateUser } from '@/services/users/userService'
import { useAuth } from '@/hooks/useAuth'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from '@/components/Button'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EditProfile = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [newData, setNewData] = useState({
        name: "",
        gender: "",
        date_of_birth: "",
        element_id: "",
    })

    const handleSubmit = async () => {
        let userData = { ...newData }
        let { name, gender, date_of_birth, element_id } = userData
        if (!name || !gender || !date_of_birth || !element_id) {
            Alert.alert("Thông tin tài khoản", "Vui lòng không bỏ trống")
            return
        }
        setLoading(true)

        const res = await updateUser(user?.id, userData)
        setLoading(false)

        console.log('update user result: ', res);
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backBtn}>
                        <BackButton size={hp(4)} />
                    </View>
                    <View>
                        <Text style={[styles.title]}>Chỉnh sửa thông tin</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Họ và tên</Text>
                        <Input
                            icon={<AntDesign name='user' size={20} color={theme.colors.textLight} />}
                            placeholder='Họ và tên'
                        />
                    </View>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Giới tính</Text>
                        <Input
                            icon={<FontAwesome name="transgender" size={20} color={theme.colors.textLight} />}
                            placeholder='Giới tính'
                        />
                    </View>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Ngày sinh</Text>
                        <Input
                            icon={<AntDesign name='calendar' size={20} color={theme.colors.textLight} />}
                            placeholder='Ngày sinh'
                        />
                    </View>
                    <View
                        style={styles.inputContainer}
                    >
                        <SelectDropdown
                            data={[

                            ]}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem.toLowerCase());
                                setNewData({ ...newData, element_id: selectedItem })
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem) || 'Vui lòng chọn mệnh'}
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
                        textStyle={styles.title}
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
        color: theme.colors.text,
        fontSize: hp(3),
        textAlign: 'center',
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
})