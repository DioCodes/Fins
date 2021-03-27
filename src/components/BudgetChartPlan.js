import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import { PieChart } from "react-native-chart-kit";

export const BudgetChartPlan = () => {
  const [allPercents, setAllPercents] = useState(0)
  const [isData, setIsData] = useState(false)
  const screenWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  const scheme = useColorScheme();
  
  let budget = useSelector((state) => state.budget.budget);
  let budgetGroups = useSelector((state) => state.budget.budgetGroups);
  let percents = 0;
  let percentLeft = 100 - allPercents;
  
  let fakeData = [
    {
      name: "red",
      percent: 55,
      color: scheme == "dark" ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .05)'
    },
  ]
  
  let data = budgetGroups;
  
  const billsCount = data.length;
  
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const ChartLegend = ({name, color, percent}) => {
    return (
      <View style={styles.chartLegendContainer}>
        <View style={{...styles.chartLegend, backgroundColor: color}} >
          <Text style={[styles.chartLegendPercent, {color: colors.primary}]}>{`${percent}%`}</Text>
        </View>

        <View style={styles.wrapper}>
          <Text style={[styles.chartLegendHeader, {color: colors.secondary,}]}>{name} </Text>
          {/* Превращает число в валютный текст */}
          <Text style={[styles.chartLegendText, {color: colors.tertiary,}]}>
            {`${parseFloat((budget * percent / 100).toFixed(0)).toLocaleString("UAh", {minimumFractionDigits: 0})} ₴`}
          </Text>
        </View>
      </View>
    )
  }

  const UnusedChartLegend = ({color, percent}) => {
    return (
      <View style={[styles.unusedChartLegendContainer]}>
        <View style={{...styles.unusedChartLegend, backgroundColor: color}} >
          <Text style={[styles.unusedChartLegendPercent, {color: "white" }]}>
            {percent}%
          </Text>
        </View>

        <Text style={[styles.unusedChartLegendText, {color: colors.tertiary,}]}>
          {`${parseFloat((budget * percent / 100).toFixed(0)).toLocaleString("UAh", {minimumFractionDigits: 0})} ₴`}
        </Text>
      </View>
    )
  }

  useEffect(() => {
    budgetGroups.map((info) => {
      percents += info.percent
    })
    setAllPercents(percents);
    
    if (data.length > 0) {
      setIsData(true)
    } else if (data.length == 0) {
      setIsData(false)
    }
  }, [budgetGroups])
    
  let legendsListArr = data.map((info, key) => {
    data = data.sort((a,b) => {
      if (a.percent < b.percent) {
        return 1
      } else if (a.percent > b.percent) {
        return -1
      }
    });
    return (
      data[key].color = info.id ? 'red' : scheme === 'dark' ? 
      `rgba(255, 255, 255, ${(billsCount-key) / billsCount})` : 
      `rgba(10, 13, 18, ${(billsCount-key) / billsCount})`,

      <ChartLegend 
        key={key} 
        name={info.name} 
        color={
          info.id ? 'red' : scheme === 'dark' ? 
            `rgba(255, 255, 255, ${(billsCount-key) / billsCount})` : 
            `rgba(10, 13, 18, ${(billsCount-key) / billsCount})`
        }
        percent={info.percent}
      />
    )
  })

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={isData == false ? fakeData : data}
        width={screenWidth}
        height={350}
        chartConfig={chartConfig}
        style={styles.chart}
        accessor={"percent"}
        backgroundColor={"transparent"}
        center={[screenWidth/4, 0]}
        hasLegend={false}
      />

      {
        percentLeft > 0 ? (
          <UnusedChartLegend
            // color={scheme === 'dark' ? "blue" : "blue"}
            color="blue"
            percent={100-allPercents}
          />
        ) : null
      }

      <View style={styles.legendsContainer}>
        {legendsListArr}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginTop: -10
  },
  legendsContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  wrapper: {
    justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
  },

  unusedChartLegendContainer: {
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom: 20
  },
  unusedChartLegend: {
    width: 45,
    height: 25,
    borderRadius: 30,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: "center"
  },
  unusedChartLegendPercent: {
    fontSize: 14,
    fontFamily: 'norms-regular'
  },
  unusedChartLegendHeader: {
    fontSize: 22,
    fontFamily: 'norms-medium'
  },
  unusedChartLegendText: {
    fontSize: 20,
    fontFamily: 'norms-regular'
  },

  chartLegendContainer: {
    flexDirection: 'row',  
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  chartLegend: {
    width: 55,
    height: 35,
    borderRadius: 30,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: "center"
  },
  chartLegendPercent: {
    fontSize: 16,
    fontFamily: 'norms-bold'
  },
  chartLegendHeader: {
    fontSize: 26,
    fontFamily: 'norms-medium'
  },
  chartLegendText: {
    fontSize: 24,
    fontFamily: 'norms-regular'
  }
})