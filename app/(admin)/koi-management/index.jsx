import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { koiFishService } from '@/services/elements/koiFishService'
import { SafeAreaView } from 'react-native-safe-area-context'

const KoiManagement = () => {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    const fetchAllData = useCallback(async () => {
        const { success, data } = await koiFishService.getAll()

        if (success) {
            setItems(data)
        }

    }, [])

    useEffect(() => { fetchAllData() }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>

            </View>
            <View style={styles.bottomContainer}>

            </View>

        </SafeAreaView>
    )
}

export default KoiManagement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    headerContainer: {},
    bottomContainer: {}
})