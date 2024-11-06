import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const Table = ({
    headers,
    items,
    page,
    itemsPerPage,
    setPage,
    numberOfItemsPerPageList,
    onItemsPerPageChange,
    showModal,
}) => {
    const { user } = useAuth()
    // Pagination variables
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    return (
        <ScrollView style={styles.bottomContainer}>
            <DataTable>
                <DataTable.Header>
                    {headers.map((header, index) => (
                        <DataTable.Title key={index} textStyle={styles.titleTable}>
                            {header.label}
                        </DataTable.Title>
                    ))}
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id}>
                        {headers.map((header, index) =>
                            <DataTable.Cell key={index} textStyle={styles.text}>
                                {header.render ? header.render(item[header.key], item) : item[header.key]}
                            </DataTable.Cell>
                        )}
                        <DataTable.Cell>
                            {user && !item.role || item.id !== user.id && <Pressable onPress={() => showModal(item)}>
                                <Entypo name="dots-three-horizontal" size={20} color="black" />
                            </Pressable>}
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={<Text style={styles.text}>{`${from + 1}-${to} of ${items.length}`}</Text>}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={<Text style={styles.text}>Rows per page</Text>}
                />
            </DataTable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
    },
    titleTable: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 14,
    },
    text: {
        fontSize: 14,
        color: 'black',
    },
});

export default Table;
