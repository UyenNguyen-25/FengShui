import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getMenh, suggestionsByMenh } from "../../components/MenhCalculator"

export default function Lookup() {
    const [year, setYear] = useState('');
    const [suggestion, setSuggestion] = useState('');

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
            <Text style={styles.header}>Tư vấn cá Koi theo mệnh</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Nhập năm sinh"
                value={year}
                onChangeText={setYear}
            />
            <Button title="Tư vấn" onPress={handleSuggest} />
            <View>
                <Text style={styles.suggestion}>{suggestion}</Text>
            </View>
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
    suggestion: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center'
    }
});

