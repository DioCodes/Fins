import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { Budget } from '../components/Budget';
import { BudgetChart } from '../components/BudgetChart';
import { BudgetChartPlan } from '../components/BudgetChartPlan';
import { Button } from '../components/Button';

import theme from '../theme';

export const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <Budget />
        <Button iconName="add-circle" iconSize={40} style={{}} />
      </View>

      <ScrollView contentContainerStyle={{}}>
        <BudgetChartPlan />
      </ScrollView>
    </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.PRIMARY_COLOR,
    paddingHorizontal: 20,
  },
  wrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});