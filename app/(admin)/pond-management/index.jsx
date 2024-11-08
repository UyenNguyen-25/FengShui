import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { pondsService } from '@/services/elements/pondsService';
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
import SearchFilter from '@/components/SearchFilter';

const PondManagement = () => {
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

    const headers = [
        { label: 'Element', key: 'suit_element', render: (value) => translate(value) },
        { label: 'Pond Shape', key: 'pond_shape', render: (value) => joinArray(translate(value)) },
        { label: 'Pond Direction', key: 'pond_direction', render: (value) => joinArray(translate(value)) },
        // { label: 'Pond Location', key: 'pond_location', render: (value) => joinArray(translate(value)) },
    ];

    const fetchAllData = useCallback(async () => {
        const { success, data } = await pondsService.getAll()

        if (success) {
            setList(list)
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
        const listShape = [
            { id: "rectangle", name: viTranslation["rectangle"] },
            { id: "round", name: viTranslation["round"] },
            { id: "triangle", name: viTranslation["triangle"] },
            { id: "square", name: viTranslation["square"] },
            { id: "oval", name: viTranslation["oval"] },
        ]

        const listDirection = [
            { id: "North", name: viTranslation["North"] },
            { id: "Northeast", name: viTranslation["Northeast"] },
            { id: "Northwest", name: viTranslation["Northwest"] },
            { id: "South", name: viTranslation["South"] },
            { id: "Southeast", name: viTranslation["Southeast"] },
            { id: "Southwest", name: viTranslation["Southwest"] },
            { id: "West", name: viTranslation["West"] },
            { id: "East", name: viTranslation["East"] },
            { id: "Center", name: viTranslation["Center"] },
        ]
        return (
            <>
                <Text style={styles.label}>Element:</Text>
                <TextInput
                    style={styles.input}
                    defaultValue={viTranslation[data.suit_element]}
                    editable={false}
                />

                <Text style={styles.label}>Pond Shape:</Text>
                <SectionedMultiSelect
                    items={listShape}
                    IconRenderer={MaterialIcons}
                    uniqueKey="id"
                    onSelectedItemsChange={(item) => setNewData({ ...newData, color: item })}
                    selectedItems={newData.pond_shape}
                    selectText='Choose some pond shapes...'
                    searchPlaceholderText='Search shape...'
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

                <Text style={styles.label}>Pond Direction:</Text>
                <SectionedMultiSelect
                    items={listDirection}
                    IconRenderer={MaterialIcons}
                    uniqueKey="id"
                    onSelectedItemsChange={(item) => setNewData({ ...newData, pond_direction: item, pond_Location: item })}
                    selectedItems={newData.pond_direction}
                    selectText='Choose some directions...'
                    searchPlaceholderText='Search direction...'
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
                    <Text style={styles.label}>Element:</Text>
                    <Text style={styles.value}>{viTranslation[data?.suit_element]}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Pond Shape:</Text>
                    <Text style={styles.value}>{joinArray(translate(data?.pond_shape))}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Pond Direction:</Text>
                    <Text style={styles.value}>{joinArray(translate(data?.pond_direction))}</Text>
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
            <ScrollView style={styles.scrollViewStyle}>
                <View style={styles.headerContainer}>
                    <SearchFilter
                        data={list}
                        onFilter={setItems}
                        filterFields={[
                            {
                                label: "Element",
                                key: "suit_element",
                                options: ["metal", "wood", "water", "fire", "earth"],
                            },
                            {
                                label: "Pond Shape",
                                key: "pond_shape",
                                options: ["rectangle", "round", "triangle", "square", "oval"],
                            },
                            {
                                label: "Pond Direction",
                                key: "pond_direction",
                                options: ["North", "Northeast", "Northwest", "South", "Southeast", "Southwest", "West", "East", "Center"],
                            },
                        ]}
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

export default PondManagement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollViewStyle: {
        flex: 1,
        paddingHorizontal: hp(5)
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
    }
})