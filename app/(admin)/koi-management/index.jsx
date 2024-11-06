import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { koiFishService } from '@/services/elements/koiFishService'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal, Portal } from 'react-native-paper';
import { joinArray, translate, viTranslation } from '@/constants/viLocale';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '@/constants/theme';
import { SelectList } from 'react-native-dropdown-select-list'
import Table from '@/components/Table';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { hp } from '@/helper/common';
import { MaterialIcons } from '@expo/vector-icons';

const KoiManagement = () => {
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

    const headers = [
        { label: 'Fish Name', key: 'name' },
        { label: 'Origin', key: 'origin', render: (value) => translate(value) },
        { label: 'Element', key: 'suit_element', render: (value) => translate(value) },
        { label: 'Colors', key: 'color', render: (value) => joinArray(translate(value)) },
        { label: 'Quantity', key: 'quantity' },
    ];

    const fetchAllData = useCallback(async () => {
        const { success, data } = await koiFishService.getAll()

        if (success) {
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

    const updateForm = () => {
        // console.log(data);

        const listColors = [
            { id: 'white', name: viTranslation['white'], },
            { id: 'black', name: viTranslation['black'] },
            { id: 'silver', name: viTranslation['silver'] },
            { id: 'red', name: viTranslation['red'] },
            { id: 'yellow', name: viTranslation['yellow'] },
            { id: 'green', name: viTranslation['green'] },
            { id: 'blue', name: viTranslation['blue'] },
            { id: 'brown', name: viTranslation['brown'] },
            { id: 'gray', name: viTranslation['gray'] },
        ]

        const listOrigin = [
            { key: 'Japan', value: viTranslation['Japan'] },
            { key: 'China', value: viTranslation['China'] },
            { key: 'Vietnam', value: viTranslation['Vietnam'] },
        ]

        const listElement = [
            { key: 'metal', value: viTranslation['metal'] },
            { key: 'wood', value: viTranslation['wood'] },
            { key: 'water', value: viTranslation['water'] },
            { key: 'fire', value: viTranslation['red'] },
            { key: 'earth', value: viTranslation['earth'] },
        ]

        return (
            <>
                <Text style={styles.label}>Fish Name:</Text>
                <TextInput
                    style={styles.input}
                    value={newData?.name}
                    onChangeText={(text) => setNewData({ ...newData, name: text })}
                    defaultValue={data.name}
                />

                <Text style={styles.label}>Quantity:</Text>
                <TextInput
                    style={styles.input}
                    value={newData?.quantity.toString()}
                    keyboardType="number-pad"
                    onChangeText={(text) => setNewData({ ...newData, quantity: parseInt(text) })}
                    defaultValue={data?.quantity.toString()}
                />

                <Text style={styles.label}>Origin:</Text>
                <SelectList
                    setSelected={(val) => setNewData({ ...newData, origin: val })}
                    data={listOrigin}
                    save="value"
                    defaultOption={{
                        key: data.origin,
                        value: viTranslation[data.origin]
                    }}
                />

                <Text style={styles.label}>Element:</Text>
                <SelectList
                    setSelected={(val) => setNewData({ ...newData, suit_element: val })}
                    data={listElement}
                    save="value"
                    defaultOption={{
                        key: data.suit_element,
                        value: viTranslation[data.suit_element]
                    }}
                />

                <Text style={styles.label}>Colors:</Text>
                <SectionedMultiSelect
                    items={listColors}
                    IconRenderer={MaterialIcons}
                    uniqueKey="id"
                    onSelectedItemsChange={(item) => setNewData({ ...newData, color: item })}
                    selectedItems={newData.color}
                    selectText='Choose some colors...'
                    searchPlaceholderText='Search color...'
                    styles={{
                        modalWrapper: {
                            padding: hp(10),
                        },
                        button: {
                            backgroundColor: "white",
                            borderColor: "red",
                            borderWidth: 1
                        },
                        confirmText: { color: "red" }
                    }}
                />

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
                <View style={styles.row}>
                    <Text style={styles.label}>Fish Name:</Text>
                    <Text style={styles.value}>{data?.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Origin:</Text>
                    <Text style={styles.value}>{translate(data?.origin)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Element:</Text>
                    <Text style={styles.value}>{translate(data?.suit_element)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Colors:</Text>
                    <Text style={styles.value}>{joinArray(translate(data?.color))}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Quantity:</Text>
                    <Text style={styles.value}>{data?.quantity}</Text>
                </View>
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
            <View style={styles.headerContainer}>

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

        </SafeAreaView>
    )
}

export default KoiManagement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
    }
})