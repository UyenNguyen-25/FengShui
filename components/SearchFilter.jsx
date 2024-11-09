import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Pressable } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { viTranslation } from '@/constants/viLocale';

const SearchFilter = ({ data, onFilter, searchFields, filterFields, dateField }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState({});
    const [dateFilters, setDateFilters] = useState({ startDate: null, endDate: null });
    const [showDatePicker, setShowDatePicker] = useState({ start: false, end: false });
    const [isFilterVisible, setFilterVisible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleFilterVisibility = () => {
        setFilterVisible(!isFilterVisible);
        Animated.timing(animation, {
            toValue: isFilterVisible ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const filterHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 250]  // Adjust height as needed
    });

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        applyFilters(query, selectedItems, dateFilters);
    };

    const handleCheckboxChange = (key, options) => {
        const updatedItems = { ...selectedItems, [key]: options };
        setSelectedItems(updatedItems);
        applyFilters(searchQuery, updatedItems, dateFilters);
    };

    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const handleDateChange = (field, date) => {
        if (date) {
            const updatedDateFilters = { ...dateFilters, [field]: moment(date).format("DD/MM/YYYY") };
            setDateFilters(updatedDateFilters);
            applyFilters(searchQuery, selectedItems, updatedDateFilters);
        } else console.log("Search Filter error filter date");

    };

    const applyFilters = (query, selected, date) => {
        if (!query && Object.values(selected).every(arr => arr.length === 0) &&
            !dateFilters.startDate && !dateFilters.endDate) {
            onFilter(data);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filteredData = data.filter((item) => {
            // Từ khóa tìm kiếm
            const matchesSearch = searchFields.some(
                (field) => item[field]?.toLowerCase().includes(lowerQuery)
            );

            // Checkbox
            const matchesCheckbox = Object.entries(selected).every(([key, options]) =>
                options.length === 0 || (Array.isArray(item[key]) ? item[key].some(val => options.includes(val)) : options.includes(item[key]))
            );

            // Ngày
            const itemDate = item[dateField] && new Date(item[dateField]);
            const startDate = date.startDate && typeof date.startDate === "string" ? parseDateString(date.startDate) : null;
            const endDate = date.endDate && typeof date.endDate === "string" ? parseDateString(date.endDate) : null;

            const matchesDate = (!startDate || itemDate >= new Date(startDate)) &&
                (!endDate || itemDate <= new Date(endDate));

            return matchesSearch && matchesCheckbox && matchesDate;
        });

        onFilter(filteredData);
    };

    const reset = () => {
        setSearchQuery('')
        setSelectedItems({})
        setDateFilters({ startDate: null, endDate: null })
        onFilter(data);
    }

    return (
        <View style={styles.container}>
            {searchFields && <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearchChange}
            />}

            <Pressable style={styles.toggleButton} onPress={toggleFilterVisibility}>
                <Text style={styles.toggleButtonText}>{isFilterVisible ? 'Hide Filters' : 'Show Filters'}</Text>
            </Pressable>

            <Animated.View style={[styles.filterSection, { height: filterHeight, overflow: 'hidden' }]}>
                <ScrollView>
                    {filterFields.map((field) => (
                        <View key={field.key} style={styles.filterContainer}>
                            <Text style={styles.label}>{field.label}</Text>
                            <SectionedMultiSelect
                                items={field.options.map(option => ({ id: option, name: viTranslation[option] }))}
                                IconRenderer={MaterialIcons}
                                uniqueKey="id"
                                selectText="Choose options..."
                                onSelectedItemsChange={(selectedOptions) => handleCheckboxChange(field.key, selectedOptions)}
                                selectedItems={selectedItems[viTranslation[field.key] || field.key] || []}
                                styles={{
                                    button: {
                                        backgroundColor: "white",
                                        borderColor: "red",
                                        borderWidth: 1
                                    },
                                    confirmText: { color: "red" }
                                }}
                            />
                        </View>
                    ))}

                    {dateField &&
                        <View style={styles.dateFilterContainer}>
                            <Text style={styles.label}>Start Date:</Text>
                            <Button title={dateFilters.startDate || "Select Start Date"} buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} hasShadow={false} onPress={() => setShowDatePicker({ ...showDatePicker, start: true })} />
                            {showDatePicker.start && (
                                <DateTimePicker
                                    value={dateFilters.startDate && typeof dateFilters.startDate === "string"
                                        ? parseDateString(dateFilters.startDate)
                                        : dateFilters.startDate || new Date()}
                                    mode="date"
                                    display="default"
                                    maximumDate={dateFilters.endDate && typeof dateFilters.endDate === "string"
                                        ? parseDateString(dateFilters.endDate)
                                        : dateFilters.startDate || new Date()}
                                    onChange={(event, date) => {
                                        setShowDatePicker({ ...showDatePicker, start: false });
                                        handleDateChange('startDate', date);
                                    }}
                                />
                            )}

                            <Text style={styles.label}>End Date:</Text>
                            <Button title={dateFilters.endDate || "Select End Date"} buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} hasShadow={false} onPress={() => setShowDatePicker({ ...showDatePicker, end: true })} />
                            {showDatePicker.end && (
                                <DateTimePicker
                                    value={dateFilters.endDate && typeof dateFilters.endDate === "string"
                                        ? parseDateString(dateFilters.endDate)
                                        : dateFilters.endDate || new Date()}
                                    mode="date"
                                    display="default"
                                    maximumDate={new Date()}
                                    onChange={(event, date) => {
                                        console.log("end date ne", date);

                                        setShowDatePicker({ ...showDatePicker, end: false });
                                        handleDateChange('endDate', date);
                                    }}
                                />
                            )}
                        </View>}

                    {/* Reset Search And Filter */}
                    <View style={styles.filterContainer}>
                        <Button title="Reset" buttonStyle={[styles.buttonStyle, { backgroundColor: "red", borderWidth: 0 }]} textStyle={[styles.textStyle, { color: "white" }]} onPress={reset} color={'red'} />
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    filterContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dateFilterContainer: {
        marginVertical: 10,
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10
    },
    textStyle: {
        color: 'black',
        textAlign: "center"
    },
    toggleButton: {
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "red",
        alignItems: 'center',
        marginBottom: 10,
    },
    toggleButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
    filterSection: {
        overflow: 'hidden',
    },
    filterContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dateFilterContainer: {
        marginVertical: 10,
    }
});

export default SearchFilter;
