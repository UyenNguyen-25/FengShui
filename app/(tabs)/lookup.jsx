import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getMenh } from "../../components/MenhCalculator"

export const Lookup = () => {
    const [year, setYear] = useState('');
    const [menh, setMenh] = useState('');

    const handleCalculate = () => {
        const calculatedMenh = getMenh(parseInt(year));
        setMenh(calculatedMenh);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Xác định mệnh theo năm sinh</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Nhập năm sinh"
                value={year}
                onChangeText={setYear}
            />
            <Button title="Xác định mệnh" onPress={handleCalculate} />
            {menh ? (
                <Text style={styles.result}>Mệnh của bạn: {menh}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        width: '80%',
        borderRadius: 5,
    },
    result: {
        fontSize: 20,
        marginTop: 20,
        color: 'green',
    },
});

