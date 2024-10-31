import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import Button from '@/components/Button';
import { wp } from '@/helper/common';
import { theme } from '@/constants/theme';
import { suggestionsByMenh } from '@/constants/elements';
import { getMenh } from '@/components/MenhCalculator';

export default function Lookup() {
    const [year, setYear] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [menh, setMenh] = useState()

    const handleSuggest = () => {
        const checkMenh = getMenh(parseInt(year));
        const suggestion = suggestionsByMenh[checkMenh];

        if (suggestion && checkMenh) {
            setMenh(checkMenh)
            setSuggestion(suggestion);
        } else {
            setSuggestion('Không tìm thấy gợi ý cho mệnh này.');
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.header}>Tư vấn cá Koi theo mệnh</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Nhập năm sinh"
                    value={year}
                    onChangeText={setYear}
                />
                <Button title="Tư vấn" buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={handleSuggest} />
                {suggestion && menh &&
                    <View style={{ marginTop: 30 }}>
                        <View style={styles.suggestion}>
                            <Text style={styles.title}>Mệnh của bạn là</Text>
                            <Text style={styles.result}>{menh}</Text>
                        </View>
                        <View style={styles.suggestion}>
                            <Text style={styles.title}>Gợi ý cá:</Text>
                            <Text style={styles.result}>{suggestion.fish.join(", ")}</Text>
                        </View>
                        <View style={styles.suggestion}>
                            <Text style={styles.title}>Số lượng cá:</Text>
                            <Text style={styles.result}>{suggestion.number.join(", ")}</Text>
                        </View>
                        <View style={styles.suggestion}>
                            <Text style={styles.title}>Hình dáng hồ:</Text>
                            <Text style={styles.result}>{suggestion.pondShape.join(", ")}</Text>
                        </View>
                        <View style={styles.suggestion}>
                            <Text style={styles.title}>Vị trí đặt hồ:</Text>
                            <Text style={styles.result}>{suggestion.location.join(", ")}</Text>
                        </View>
                    </View>}
            </View>
        </ScreenWrapper>
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
    title: {
        width: 120,
        fontSize: 16,
        fontWeight: "bold",
        color: 'green',
    },
    result: {
        fontSize: 16,
    },
    suggestion: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        gap: 30
    },
    buttonStyle: {
        backgroundColor: "red",
        padding: wp(2),
        paddingHorizontal: wp(4),
        borderRadius: wp(2)
    },
    textStyle: {
        color: "white",
        fontWeight: theme.fonts.semibold
    }
});

