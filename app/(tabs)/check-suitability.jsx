import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { suggestionsByMenh, getMenh } from "../../components/MenhCalculator"

export default function CheckSuitability() {
    const [year, setYear] = useState('');
    const [fishColor, setFishColor] = useState('');
    const [pondShape, setPondShape] = useState('');
    const [pondDirection, setPondDirection] = useState('');
    const [numberOfFish, setNumberOfFish] = useState('');
    const [pondLocation, setPondLocation] = useState('');
    const [result, setResult] = useState('');

    const calculateCompatibility = (menh) => {
        const suggestion = suggestionsByMenh[menh];
        let score = 0;

        // So sánh màu sắc cá
        if (suggestion?.fish?.includes(fishColor.toLowerCase())) {
            score += 20;
        }

        // So sánh số lượng cá
        if (suggestion?.number?.includes(numberOfFish)) {
            score += 20;
        }

        // So sánh hình dáng hồ
        if (suggestion?.pondShape?.includes(pondShape.toLowerCase())) {
            score += 20;
        }

        // So sánh hướng đặt hồ
        if (suggestion?.pondDirection?.includes(pondDirection.toLowerCase())) {
            score += 20;
        }

        // So sánh vị trí đặt hồ
        if (suggestion?.location?.includes(pondLocation.toLowerCase())) {
            score += 20;
        }

        return score;
    };

    const handleCheckCompatibility = () => {
        const menh = getMenh(parseInt(year));
        const score = calculateCompatibility(menh);
        setResult(`Mệnh của bạn là ${menh}.\nĐiểm đánh giá độ phù hợp: ${score}/100`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tra cứu độ phù hợp</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập năm sinh của bạn"
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
            />
            <TextInput
                style={styles.input}
                placeholder="Màu sắc cá Koi (trắng, đỏ, đen,...)"
                value={fishColor}
                onChangeText={setFishColor}
            />
            <TextInput
                style={styles.input}
                placeholder="Số lượng cá (ví dụ: 1, 3, 4,...)"
                value={numberOfFish}
                onChangeText={setNumberOfFish}
            />
            <TextInput
                style={styles.input}
                placeholder="Hình dáng hồ (hình tròn, chữ nhật,...)"
                value={pondShape}
                onChangeText={setPondShape}
            />
            <TextInput
                style={styles.input}
                placeholder="Hướng đặt hồ (Bắc, Nam,...)"
                value={pondDirection}
                onChangeText={setPondDirection}
            />
            <TextInput
                style={styles.input}
                placeholder="Vị trí đặt hồ (trung tâm, hướng Đông,...)"
                value={pondLocation}
                onChangeText={setPondLocation}
            />
            <Button title="Tra cứu" onPress={handleCheckCompatibility} />
            <Text style={styles.result}>{result}</Text>
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
    result: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center'
    }
});

