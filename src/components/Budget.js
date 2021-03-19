import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Budget = () => {
  return (
    <View style={styles.budgetContainer}>
      <Text style={styles.budgetHeader}>Ваш бюджет:</Text>
      <Text style={styles.budgetText}>11 692 ₴</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  budgetContainer: {
    // top: 30,
    // backgroundColor: 'red'
  },
  budgetHeader: {
    color: 'white',
    fontFamily: 'norms-regular',
    fontSize: 20,
    opacity: 0.5,
  },
  budgetText: {
    color: 'white',
    fontFamily: 'norms-bold',
    fontSize: 40,
  }
})