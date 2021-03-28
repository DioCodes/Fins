import React, { useState } from 'react';
import { 
  Dimensions, 
  InputAccessoryView, 
  StyleSheet, 
  Text, 
  Keyboard, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import CurrencyInput from 'react-native-currency-input';
import * as Haptics from "expo-haptics";

import { useDispatch, useSelector } from 'react-redux';
import { setBudget } from '../store/actions/budgetActions'

import theme from '../theme';
import { Button } from './Button';

export const Budget = ({ onFocus, onBlur }) => {
  let budget = useSelector((state) => state.budget.budget);
  
  const [myBudget, setMyBudget] = useState(budget);
  
  const { colors } = useTheme();
  const dispatch = useDispatch();
  
  const onPressHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.budgetContainer}>
      <Text style={[styles.budgetHeader, {color: colors.secondary}]}>Ваш бюджет:</Text>
      <TouchableOpacity activeOpacity={theme.ACTIVE_OPACITY} onPress={onPressHandler} >
        <CurrencyInput
          onFocus={onFocus}
          onEndEditing={() => {
            onBlur();
            setMyBudget(budget);
          }}
          inputAccessoryViewID="Submit"
          unit="₴"
          delimiter=" "
          precision={0}
          style={[styles.budgetText, {color: colors.secondary}]} 
          placeholder="₴10 000" 
          keyboardType="number-pad"
          value={myBudget} 
          onChangeValue={(value) => setMyBudget(value)}
        />

        <InputAccessoryView nativeID="Submit">
          <View style={styles.accessory}>
            <Button 
              text="Готово" 
              textStyle={{ color: theme.PRIMARY_COLOR, fontSize: 18 }} 
              style={styles.submitBtn} 
              onPress={() => {
                Keyboard.dismiss();
                onBlur();
                dispatch(setBudget(myBudget));
              }}
            />
          </View>
        </InputAccessoryView>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  budgetContainer: {
    width: '80%'
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
  },
  accessory: {
    width: Dimensions.get("window").width, 
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  submitBtn: {
    backgroundColor: 'white',
    width: 100,
    height: 50,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  }
})