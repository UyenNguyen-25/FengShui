import { Alert, Button, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal, Portal, RadioButton } from 'react-native-paper';
import { translate, viGender, viTranslation } from '@/constants/viLocale';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '@/constants/theme';
import { gender } from '@/constants/enLocale';
import { hp } from '@/helper/common';
import { AntDesign } from '@expo/vector-icons';
import { userService } from '@/services/users/userService';
import { getMenh } from '@/components/MenhCalculator';
import moment from 'moment';
import Table from '@/components/Table';
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchFilter from '@/components/SearchFilter';

const UserManagement = () => {
    const [list, setList] = useState([])
    const [items, setItems] = useState([])
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 20]);
    const [itemsPerPage, setItemsPerPage] = useState(
        5
    );
    const [visible, setVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({})
    const [newData, setNewData] = useState({})
    const [openDate, setOpenDate] = useState(false)

    const headers = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Date of Birth', key: 'date_of_birth', render: (value) => moment(new Date(value)).format("DD/MM/YYYY") },
        { label: 'Gender', key: 'gender', render: (value) => viGender[value] },
        { label: 'Element', key: 'element', render: (value) => translate(value) },
        { label: 'Total Post', key: 'total_post' },
    ];

    const fetchAllData = useCallback(async () => {
        const { success, data } = await userService.getAll()

        if (success) {
            setList(data)
            setItems(data)
        }

    }, [])

    useEffect(() => { fetchAllData() }, [])

    const showModal = (item) => {
        // console.log(item);

        setData(item)
        setNewData(item)
        setVisible(true)

    };

    const hideModal = () => {
        setVisible(false)
        setIsEditing(false)
        // setNewData(data)
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => { } }
            ]
        );
    };

    const handleUpdate = () => {
        setIsEditing(false);
    };

    const onChange = ({ type }, selectedData) => {
        // console.log(type);
        if (type === 'dismissed') {
            setOpenDate(false)
            return
        }

        const currentData = selectedData
        const element = getMenh(parseInt(moment(currentData).format("YYYY")))
        console.log(element);

        if (element) setNewData({ ...newData, element: viTranslation[element], date_of_birth: currentData })

        if (Platform.OS === 'android') {
            // Đóng picker trên Android sau khi chọn
            setOpenDate(false);
        }
    }


    const updateForm = () => {
        // console.log(data);

        return (
            <>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={newData?.name}
                    onChangeText={(text) => setNewData({ ...newData, name: text })}
                    defaultValue={data.name}
                />

                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setNewData({ ...newData, email: text })}
                    defaultValue={data?.email}
                    editable={false}
                />

                <Text style={styles.label}>Gender:</Text>
                <RadioButton.Group
                    onValueChange={newValue => {
                        const enValue = gender[newValue]
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

                <Text style={styles.label}>Element:</Text>
                <Text>
                    {
                        !newData.element ? viTranslation[data.element] : viTranslation[newData.element]
                    }
                </Text>

                <Text style={styles.label}>Date of Birth:</Text>
                <Pressable onPress={() => { setOpenDate(!openDate) }}>
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
                        <Text>
                            {moment(newData.date_of_birth).format("DD/MM/YYYY")}
                        </Text>
                    </View>
                </Pressable>
                {openDate && <DateTimePicker
                    mode='date'
                    display={Platform.OS !== 'ios' ? 'spinner' : 'calendar'}
                    value={new Date(newData.date_of_birth)}
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
                />}

                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleUpdate} />
                    <Button title="Cancel" color={"red"} onPress={() => {
                        setIsEditing(false)
                        setNewData(data)
                    }} />
                </View>
            </>
        )
    }

    const detailForm = () => {
        return (
            <>
                {headers.map((item, index) => {
                    return <View style={styles.row} key={item.key + index}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.value}>{item.render ? item.render(data[item.key]) : data[item.key]}</Text>
                    </View>
                })}

                <View style={styles.buttonContainer}>
                    <Button title="Update" onPress={() => setIsEditing(true)} />
                    <Button title="Delete" color="red" onPress={handleDelete} />
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                    <ScrollView style={styles.content}>
                        {isEditing ? (
                            updateForm()
                        ) : (
                            detailForm()
                        )}
                    </ScrollView>
                </Modal>
            </Portal>
            <ScrollView style={styles.scrollViewStyle}>
                <View style={styles.headerContainer}>
                    <SearchFilter
                        data={list}
                        onFilter={setItems}
                        searchFields={['name']}
                        filterFields={[
                            {
                                label: "Element",
                                key: "element",
                                options: ["metal", "wood", "water", "fire", "earth"],
                            },
                            {
                                label: "Gender",
                                key: 'gender',
                                options: [0, 1, 2]
                            }
                        ]}
                        dateField={"date_of_birth"}

                    />
                </View>

                <Table
                    headers={headers}
                    items={items}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    setPage={setPage}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    onItemsPerPageChange={(newItemsPerPage) => setItemsPerPage(newItemsPerPage)}
                    showModal={showModal}
                />
            </ScrollView>

        </SafeAreaView>
    )
}

export default UserManagement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollViewStyle: {
        flex: 1,
        paddingHorizontal: hp(5)
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        width: "60%",
        borderRadius: theme.radius.sm,
        alignSelf: 'center'
    },
    content: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    label: {
        fontWeight: 'bold',
        marginVertical: hp(3)
    },
    value: {
        marginLeft: 10,
    },
    input: {
        borderBottomWidth: 1,
        marginVertical: 5,
        padding: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    headerContainer: {},
    bottomContainer: {},
    titleTable: {
        color: 'black',
        fontWeight: theme.fonts.bold
    },
    text: {
        color: "black"
    },
    radioItem: {
        alignItems: "center",
        flexDirection: "row",
        gap: 2
    }
})