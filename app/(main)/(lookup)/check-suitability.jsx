import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { suggestionsByMenh } from '@/constants/elements';
import { getMenh } from '@/components/MenhCalculator';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenWrapper from '@/components/ScreenWrapper';
import Button from '@/components/Button';
import { hp, wp } from '@/helper/common';
import { theme } from '@/constants/theme';

const REG_NUMBER = /[^0-9]/g

export default function CheckSuitability() {
    const [year, setYear] = useState('');
    const [fishColor, setFishColor] = useState('');
    const [pondShape, setPondShape] = useState('');
    const [pondDirection, setPondDirection] = useState('');
    const [numberOfFish, setNumberOfFish] = useState('');
    const [pondLocation, setPondLocation] = useState('');
    const [result, setResult] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [menh, setMenh] = useState()

    const calculateCompatibility = (menh) => {
        const suggestion = suggestionsByMenh[menh];
        let score = 0;

        if (suggestion) {
            setSuggestion(suggestion);
        }

        // So sánh màu sắc cá
        if (suggestion?.fish?.includes(fishColor)) {
            score += 20;
        }

        // So sánh số lượng cá
        if (suggestion?.number?.includes(numberOfFish)) {
            console.log('score of numberOfFish: ' + 20);

            score += 20;
        }

        // So sánh hình dáng hồ
        if (suggestion?.pondShape?.join(", ").includes(pondShape)) {
            console.log('score of pondShape: ' + 20);

            score += 20;
        }

        // So sánh hướng đặt hồ
        if (suggestion?.pondDirection?.includes(pondDirection)) {
            console.log('score of pondDirection: ' + 20);

            score += 20;
        }

        // So sánh vị trí đặt hồ
        if (suggestion?.location?.includes(pondLocation)) {
            console.log('score of pondLocation: ' + 20);

            score += 20;
        }

        return score;
    };

    const handleCheckCompatibility = () => {
        const menh = getMenh(parseInt(year));
        const score = calculateCompatibility(menh);
        setResult(score);
        setMenh(menh)
    };

    const handleReset = () => {
        setYear('')
        setFishColor('')
        setPondShape('')
        setPondDirection('')
        setPondLocation('')
        setNumberOfFish('')
        setMenh('')
        setSuggestion('')
        setResult('')
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Tra cứu độ phù hợp</Text>
                <View style={styles.form}>
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Năm sinh</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập năm sinh của bạn"
                            keyboardType="numeric"
                            value={year}
                            onChangeText={setYear}
                        />
                    </View>

                    {/* number of fish */}
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Số lượng cá</Text>
                        <TextInput
                            numberOfLines={4}
                            keyboardType='numbers-and-punctuation'
                            style={styles.input}
                            placeholder="Số lượng cá (ví dụ: 1, 3, 4,...)"
                            value={numberOfFish}
                            onChangeText={(text) => {
                                const result = text.replace(REG_NUMBER, '')
                                setNumberOfFish(result)
                            }}
                        />
                    </View>

                    {/* Fish color */}
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Màu sắc cá Koi</Text>
                        <SelectDropdown
                            data={[
                                "Trắng", "Bạc", "Vàng kim",
                                "Xanh lá cây",
                                "Đen", "Xanh dương",
                                "Đỏ", "Cam",
                                "Vàng", "Nâu", "Cam đất"
                            ]}
                            onSelect={(selectedItem) => {
                                console.log('================== Fish Color ==================');
                                console.log(selectedItem.toLowerCase());
                                console.log('================================================');
                                setFishColor(selectedItem.toLowerCase())
                            }}
                            renderButton={(_selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(fishColor) || 'Màu sắc cá Koi'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View key={index} style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>

                    {/* pond shape */}
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Hình dáng hồ</Text>
                        <SelectDropdown
                            data={[
                                "Hình tròn, bầu dục", "Hình chữ nhật, dài",
                                "Hình tròn, cong uốn lượn",
                                "Hình tam giác",
                                "Hình vuông"
                            ]}
                            onSelect={(selectedItem) => {
                                console.log('================== Pond Shape ==================');
                                console.log(selectedItem.toLowerCase());
                                console.log('================================================');
                                setPondShape(selectedItem.toLowerCase())
                            }
                            }
                            renderButton={(_selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(pondShape) || 'Hình dáng hồ'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View key={index} style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                    </View>
                                );
                            }}
                            v
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>

                    {/* pond direction */}
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Hướng đặt hồ</Text>
                        <SelectDropdown
                            data={[
                                "Tây", "Tây Bắc", "Đông", "Đông Nam",
                                "Bắc", "Nam", "Tây Nam", "Đông Bắc"
                            ]}
                            onSelect={(selectedItem) => {
                                console.log('================== Pond Direction ==================');
                                console.log(selectedItem);
                                console.log('====================================================');
                                setPondDirection(selectedItem)
                            }
                            }
                            renderButton={(_selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(pondDirection) || 'Hướng đặt hồ'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View key={index} style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>

                    {/* location */}
                    <View
                        style={styles.inputContainer}
                    >
                        <Text>Vị trí đặt hồ</Text>
                        <SelectDropdown
                            data={[
                                "Trung tâm", "Hướng Tây Bắc", "Hướng Đông",
                                "Đông Nam", "Hướng Bắc", "Hướng Nam", "Tây Nam", "Đông Bắc"
                            ]}
                            onSelect={(selectedItem) => {
                                console.log('================== Pond Location ==================');
                                console.log(selectedItem);
                                console.log('===================================================');
                                setPondLocation(selectedItem)
                            }
                            }
                            renderButton={(_selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(pondLocation) || 'Vị trí đặt hồ'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View key={index} style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <Button title="Tra cứu" buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={handleCheckCompatibility} />
                        <Button title='Làm mới' buttonStyle={[styles.buttonStyle, { backgroundColor: theme.colors.textLight }]} textStyle={{ color: "white" }} onPress={handleReset} />
                    </View>
                </View>

                {result && <View style={styles.resultContainer}>
                    <Text style={styles.result}>{`Mệnh của bạn là ${menh}.\nĐiểm đánh giá độ phù hợp: ${result}/100`}</Text>
                    {result !== 100 &&
                        <View >
                            <View style={styles.suggestion}>
                                <Text style={styles.suggestionTitle}>Gợi ý cá:</Text>
                                <Text style={styles.result}>{suggestion.fish.join(", ")}</Text>
                            </View>
                            <View style={styles.suggestion}>
                                <Text style={styles.suggestionTitle}>Số lượng cá:</Text>
                                <Text style={styles.result}>{suggestion.number.join(", ")}</Text>
                            </View>
                            <View style={styles.suggestion}>
                                <Text style={styles.suggestionTitle}>Hình dáng hồ:</Text>
                                <Text style={styles.result}>{suggestion.pondShape.join(", ")}</Text>
                            </View>
                            <View style={styles.suggestion}>
                                <Text style={styles.suggestionTitle}>Vị trí đặt hồ:</Text>
                                <Text style={styles.result}>{suggestion.location.join(", ")}</Text>
                            </View>
                        </View>}
                </View>}
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginBottom: hp(8)
    },
    form: {
        width: "100%",
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    suggestionTitle: {
        width: "50%",
        fontSize: 14,
        fontWeight: theme.fonts.semibold,
    },
    inputContainer: {
        width: '80%',
        gap: 5
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    result: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: hp(4)
    },
    dropdownButtonStyle: {
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    suggestion: {
        alignItems: "center",
        flexDirection: "row",
        gap: hp(3)
    },
    buttonStyle: {
        backgroundColor: "red",
        padding: wp(2),
        paddingHorizontal: wp(4),
        borderRadius: wp(2)
    },
    textStyle: {
        color: "white",
        fontWeight: theme.fonts.bold
    },
    resultContainer: {
        height: "auto",
        paddingHorizontal: wp(13),
        marginTop: hp(3),
        gap: hp(3)
    }
});

