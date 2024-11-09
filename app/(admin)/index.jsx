import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { transactionService } from '../../services/transaction/transactionService';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState({ labels: [], datasets: [{ data: [] }] });
    const [data, setData] = useState([])

    const fetchAllData = useCallback(async () => {
        const { success, data: transactions } = await transactionService.getAll();
        if (success) {
            setData(transactions)
        } else console.log("got error at dashboard");
    }, [])

    useEffect(() => {
        fetchAllData()
        // Xử lý pieData
        const packageCount = data.reduce((acc, item) => {
            const packageName = item.packageId.name;
            acc[packageName] = (acc[packageName] || 0) + 1;
            return acc;
        }, {});

        const colors = ["#f39c12", "#e74c3c", "#8e44ad", "#3498db", "#2ecc71", "#d35400"];
        const pieDataArray = Object.keys(packageCount).map((key, index) => ({
            name: key,
            population: packageCount[key],
            color: colors[index % colors.length], // Chọn màu sắc luân phiên
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }));
        setPieData(pieDataArray);

        // Xử lý barData
        const dateCount = data.reduce((acc, item) => {
            const date = new Date(item.created_at).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        setBarData({
            labels: Object.keys(dateCount),
            datasets: [{ data: Object.values(dateCount) }]
        });

    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Thống kê gói Package</Text>
            <View style={styles.chartContainer}>
                {pieData.length > 0 ? (
                    <PieChart
                        data={pieData}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                ) : (
                    <Text style={styles.noDataText}>Không có dữ liệu để hiển thị</Text>
                )}
            </View>

            <Text style={styles.title}>Lượt mua trong tháng</Text>
            <View style={styles.chartContainer}>
                {barData.labels.length > 0 ? (
                    <BarChart
                        data={barData}
                        width={screenWidth - 40}
                        height={220}
                        yAxisLabel=""
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                    />
                ) : (
                    <Text style={styles.noDataText}>Không có dữ liệu để hiển thị</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default Dashboard;

const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#f2f2f2",
    backgroundGradientTo: "#f2f2f2",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
        textAlign: "center",
    },
    chartContainer: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    noDataText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    }
});
