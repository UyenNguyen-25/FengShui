import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { suggestionsByMenh, getMenh } from "../../components/MenhCalculator"

export const CheckSuitability = () => {
    const [year, setYear] = useState('');
    const [suggestion, setSuggestion] = useState('');

    // Hàm xử lý khi người dùng bấm nút "Tư vấn"
    const handleSuggest = () => {
        const menh = getMenh(parseInt(year));
        const suggestion = suggestionsByMenh[menh];
        if (suggestion) {
            setSuggestion(
                `Mệnh của bạn là ${menh}.\n` +
                `Gợi ý cá: ${suggestion.fish}\n` +
                `Số lượng cá: ${suggestion.number}\n` +
                `Hình dáng hồ: ${suggestion.shape}\n` +
                `Vị trí đặt hồ: ${suggestion.direction}`
            );
        } else {
            setSuggestion('Không tìm thấy gợi ý cho mệnh này.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tư vấn cá Koi theo mệnh</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập năm sinh của bạn"
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
            />
            <Button title="Tư vấn" onPress={handleSuggest} />
            <Text style={styles.suggestion}>{suggestion}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingHorizontal: 10
    },
    suggestion: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center'
    }
});

