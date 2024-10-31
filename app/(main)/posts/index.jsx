import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SocialScreen = () => {
    const cardData = [
        {
            id: 1,
            title: 'Kohaku Koi',
            image: require('@/assets/images/social_1.jpeg'),
        },
        {
            id: 2,
            title: 'Showa Koi',
            image: require('@/assets/images/social_2.png'),
        },
        {
            id: 3,
            title: 'Taisho Sanke',
            image: require('@/assets/images/social_3.png'),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>KoiMaster</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Bạn đang nghĩ gì?"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.cardContainer}>
                    {cardData.map((card) => (
                        <TouchableOpacity key={card.id} style={styles.card}>
                            <Image
                                source={card.image}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>{card.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.featuredSection}>
                    <Text style={styles.sectionTitle}>Featured Koi</Text>
                    <Image
                        source={require('@/assets/images/social_2.png')}
                        style={styles.featuredImage}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        padding: 15,
        backgroundColor: '#FF4444',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    addButton: {
        width: 40,
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        color: '#FF4444',
    },
    content: {
        flex: 1,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    cardTitle: {
        padding: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    featuredSection: {
        padding: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    featuredImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
    },
});

export default SocialScreen;