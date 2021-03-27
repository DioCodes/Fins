import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { addBudgetGroup, removeBudgetGroup } from '../store/actions/budgetActions';

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

  const [hide, setHide] = useState(false)
  let budgetGroups = useSelector((state) => state.budget.budgetGroups);

  const { colors } = useTheme();
  const dispatch = useDispatch();
  
  const onFocus = () => {
    setHide(true)
  }

  const onBlur = () => {
    setHide(false)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={[styles.main, { backgroundColor: colors.primary }]}>
      <View style={styles.wrapper}>
        <Budget onFocus={onFocus} onBlur={onBlur} />
        <Button 
          iconName="add-circle" 
          iconSize={40} 
          onPress={() => {
            // dispatch(addBudgetGroup("Инвестиции", 10))
            // dispatch(removeBudgetGroup())
            
            navigation.push("AddBudgetGroupScreen")
            // console.log(budgetGroups)
          }} 
        />
      </View>

      <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 20 }}>
        <BudgetChartPlan />
        {hide ? <View style={styles.hider}/> : null}
      </ScrollView>
    </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hider: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: "100%",
    backgroundColor: theme.PRIMARY_COLOR,
    position: 'absolute',
    opacity: .75,
    alignSelf: 'center'
  }

});