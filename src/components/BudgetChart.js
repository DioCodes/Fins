import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";

import { PieChart } from "react-native-chart-kit";

const myMoney = 11692;


const data = [
  {
    name: "Неприкосновенный запас",
    percent: 20,
    color: "rgba(255, 255, 255, 255)",
  },
  {
    name: "Необходимые траты",
    percent: 30,
    color: "rgba(255, 255, 255, .75)",
  },
  {
    name: "Бизнес",
    percent: 40,
    color: "rgba(255, 255, 255, .5)",
  },
  {
    name: "Остальное",
    percent: 10,
    color: "rgba(255, 255, 255, .25)",
  }
];

export const BudgetChart = () => {
  const screenWidth = Dimensions.get("window").width;
  
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const ChartLegend = ({name, color, percent}) => {
    return (
      <View style={styles.chartLegendContainer}>
        <View style={styles.wrapper}>
          <View style={{...styles.chartLegend, backgroundColor: color}} />
          <Text style={styles.chartLegendText}>{name} </Text>
        </View>

        {/* Превращает число в валютный текст */}
        <Text style={styles.chartLegendText}>
          {`${parseFloat((myMoney * percent / 100).toFixed(0)).toLocaleString("UAh", {minimumFractionDigits: 0})} ₴`}
        </Text>
      </View>
    )
  }
  
  const legendsListArr = data.map((buttonInfo, key) => {
    return (
      <ChartLegend 
        key={key} 
        name={buttonInfo.name} 
        color={buttonInfo.color}
        percent={buttonInfo.percent}
      />
    )
  })

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={data}
        width={screenWidth}
        height={400}
        style={styles.chart}
        chartConfig={chartConfig}
        accessor={"percent"}
        backgroundColor={"transparent"}
        paddingLeft={0}
        center={[screenWidth/4, 0]}
        hasLegend={false}
      />
      
      <View style={styles.legendsContainer}>
        {legendsListArr}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    // backgroundColor: 'purple'
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  chart: {
    // backgroundColor: 'blue',
  },
  legendsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  chartLegendContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  wrapper: {
    flexDirection: 'row',
  },
  chartLegend: {
    width: 20,
    height: 20,
    borderRadius: 30,
    marginRight: 10
  },
  chartLegendText: {
    color: "rgba(255, 255, 255, .5)",
    fontSize: 22
  }
})