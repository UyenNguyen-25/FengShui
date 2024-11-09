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
import SearchFilter from '@/components/SearchFilter';
import { postService } from '../../../services/post/postService';

const PostManagement = () => {
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
        { label: 'Type Post', key: 'type' },
        { label: 'Element', key: 'element', render: (value) => translate(value) },
        { label: 'Title', key: 'title' },
        { label: 'Description', key: 'description' },
        { label: 'Created By', key: 'userId', render: (value) => value["name"] },
        { label: 'Created At', key: 'created_at' },
    ];

    const fetchAllData = useCallback(async () => {
        const { success, data } = await postService.getAll()

        if (success) {
            setList(data)
            setItems(data)
        }
    }, [])

    useEffect(() => {
        fetchAllData()
    }, [])

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

    const detailForm = () => {
        return (
            <>
                <View style={styles.row}>
                    <Text style={styles.label}>Title:</Text>
                    <Text style={styles.value}>{data?.title}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Type Post:</Text>
                    <Text style={styles.value}>{data?.type}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Element:</Text>
                    <Text style={styles.value}>{translate(data?.element)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{data?.description}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Create By:</Text>
                    <Text style={styles.value}>{data?.userId?.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Create At:</Text>
                    <Text style={styles.value}>{data?.created_at}</Text>
                </View>
                {/* <View style={styles.buttonContainer}>
                    <Button title="Update" onPress={() => setIsEditing(true)} />
                    <Button title="Delete" color="red" onPress={handleDelete} />
                </View> */}
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
                        searchFields={['title']}
                        filterFields={[
                            {
                                label: "Element",
                                key: "suit_element",
                                options: ["metal", "wood", "water", "fire", "earth"],
                            },
                        ]}
                        dateField={"created_at"}
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

export default PostManagement

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
    }
})