import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";

import { PieChart } from "react-native-chart-kit";

const myMoney = 11692;

export const BudgetChartPlan = () => {
  const screenWidth = Dimensions.get("window").width;
  
  let data = [
    {
      name: "Необходимые траты",
      percent: 25,
      color: "rgba(255, 255, 255, .75)",
    },
    {
      name: "Остальное",
      percent: 15,
      color: "rgba(255, 255, 255, .25)",
    },
    {
      name: "Неприкосновенный запас",
      percent: 20,
      color: "rgba(255, 255, 255, 255)",
    },
    {
      name: "Бизнес",
      percent: 40,
      color: "rgba(255, 255, 255, .5)",
    },
  ];

  const billsCount = data.length;
  
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const ChartLegend = ({name, color, percent}) => {
    return (
      <View style={styles.chartLegendContainer}>
        <View style={{...styles.chartLegend, backgroundColor: color}} >
          <Text style={styles.chartLegendPercent}>{`${percent}%`}</Text>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.chartLegendHeader}>{name} </Text>
          {/* Превращает число в валютный текст */}
          <Text style={styles.chartLegendText}>
            {`${parseFloat((myMoney * percent / 100).toFixed(0)).toLocaleString("UAh", {minimumFractionDigits: 0})} ₴`}
          </Text>
        </View>
      </View>
    )
  }

  const legendsColorArr = data.map((info, key) => {
    // data.push(mas);

    // Сортируем массив от наибольшего % к наименьшему
    data = data.sort((a,b) => {
      if (a.percent < b.percent) {
        return 1
      } else if (a.percent > b.percent) {
        return -1
      }
    });
    return (
      // Получаем цвет соответствующий ключу по списку
      data[key].color = `rgba(255, 255, 255, ${(billsCount-key) / billsCount})`
    )
  })
  
  let legendsListArr = data.map((info, key) => {
    console.log(info)
    console.log("__________")
    return (
      <ChartLegend 
        key={key} 
        name={info.name} 
        color={`rgba(255, 255, 255, ${(billsCount-key) / billsCount})`}
        percent={info.percent}
      />
    )
  })

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={data}
        width={screenWidth}
        height={350}
        chartConfig={chartConfig}
        style={styles.chart}
        accessor={"percent"}
        backgroundColor={"transparent"}
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
  },
  chart: {
    // backgroundColor: 'blue',
    marginTop: -10
  },
  legendsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red'
  },
  
  chartLegendContainer: {
    // backgroundColor: 'blue',
    flexDirection: 'row',  
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  wrapper: {
    justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  chartLegend: {
    width: 45,
    height: 25,
    borderRadius: 30,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: "center"
  },
  chartLegendPercent: {
    fontSize: 14,
    fontFamily: 'norms-regular'
  },

  chartLegendHeader: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 22,
    fontFamily: 'norms-medium'
  },
  chartLegendText: {
    color: "rgba(255, 255, 255, .5)",
    fontSize: 20,
    fontFamily: 'norms-regular'
  }
})