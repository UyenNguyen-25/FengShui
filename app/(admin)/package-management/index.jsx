import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { packageService } from '@/services/package/packageService';
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataTable, Modal, Portal } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { hp, wp } from '@/helper/common';
import { theme } from '@/constants/theme';
import Table from '@/components/Table';

const PackageManagement = () => {
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
        { label: 'Package Name', key: 'name' },
        { label: 'Number of Post', key: 'num_of_post' },
        { label: 'Price', key: 'price', render: (value) => formatNumber(value) },
    ];

    const fetchAllData = useCallback(async () => {
        const { success, data } = await packageService.getAll()

        if (success) {
            setItems(data)
        }

    }, [])

    useEffect(() => { fetchAllData() }, [])

    const showModal = (item) => {
        console.log(item);

        setData(item)
        setNewData(item)
        setVisible(true)

    };
    const hideModal = () => {
        setVisible(false)
        setIsEditing(false)
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
        return (
            <>
                <Text style={styles.label}>Package Name:</Text>
                <TextInput
                    style={styles.input}
                    value={newData?.name}
                    onChangeText={(text) => setNewData({ ...newData, name: text })}
                    defaultValue={data.name}
                />
                <Text style={styles.label}>Number of Post:</Text>
                <TextInput
                    style={styles.input}
                    value={String(newData.num_of_post)}
                    keyboardType='number-pad'
                    onChangeText={(text) => setNewData({ ...newData, num_of_post: text })}
                    defaultValue={data.num_of_post}
                />
                <Text style={styles.label}>Price:</Text>
                <TextInput
                    style={styles.input}
                    value={String(formatNumber(newData?.price))}
                    keyboardType='number-pad'
                    onChangeText={(text) => setNewData({ ...newData, price: text })}
                    defaultValue={data.price}
                />

                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleUpdate} />
                    <Button title="Cancel" color="red" onPress={() => {
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
                    <Text style={styles.label}>Package Name:</Text>
                    <Text style={styles.value}>{data?.name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Number of Post:</Text>
                    <Text style={styles.value}>{data?.num_of_post}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.value}>{formatNumber(data?.price)}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Update" onPress={() => setIsEditing(true)} />
                    <Button title="Delete" color="red" onPress={handleDelete} />
                </View>
            </>
        )
    }

    function formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number)
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

export default PackageManagement

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
    titleTable: {
        color: 'black',
        fontWeight: theme.fonts.bold
    },
    text: {
        color: "black"
    }
})