import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack"
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../components/Button';
import { HeaderModal } from '../components/HeaderModal';
import { addBudgetGroup } from '../store/actions/budgetActions';
import theme from '../theme';

export const AddBudgetGroupScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    // navigation.setOptions();
    navigation.setOptions(
      HeaderModal(navigation, "Создать группу"),
    );

    loadPercents()
  }, []);
  
  const [newGroupName, setNewGroupName] = useState("");
  const [groupPercent, setGroupPercent] = useState(40);
  const [percents, setPercents] = useState([])
  // const [groupMoney, setGroupMoney] = useState();

  const { colors } = useTheme();
  const dispatch = useDispatch();

  const loadPercents = () => {
    let n = [];
    const minNum = 0;
    const maxNum = 100;

    for (let i = minNum; i <= maxNum; i++) {
      n.push(
        <Picker.Item key={i} label={`${i}%`} value={i} />
      )
    }

    setPercents(n);
  };

  return (
    <View style={styles.main}>

      <View style={styles.sheetContainerContent}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: colors.quaternary,
            width: "100%",
            paddingBottom: 5,
            marginBottom: 20,
          }}
        >
          <TextInput
            style={{
              fontFamily: "norms-bold",
              color: colors.secondary,
              fontSize: 20,
            }}
            clearButtonMode="while-editing"
            value={newGroupName}
            onChangeText={(text) => {
              setNewGroupName(text);
            }}
            placeholder={"Название группы"}
            maxLength={30}
            returnKeyType="done"
            autoCorrect={false}
          />
        </View>
      </View>

      <View style={styles.budgetDistribution}>
        <Picker
          selectedValue={groupPercent}
          onValueChange={(itemValue, itemIndex) =>
            setGroupPercent(itemValue)
          }
          style={{
            justifyContent: 'center',
            width: "60%",
          }}
          itemStyle={{
            color: colors.secondary,
          }}
        >
          {percents}
        </Picker>
      </View>

      <Text style={{...styles.descriptionText, color: colors.secondary}}>
        Выберите, сколько процентов вы хотите отложить
      </Text>

    <View style={styles.wrapper}>
      <Button 
        text="Готово"
        textStyle={{...styles.submitText, color: colors.primary}}
        style={{...styles.submitBtn, backgroundColor: colors.secondary,}} 
        onPress={() => {
          dispatch(addBudgetGroup(newGroupName, groupPercent))
          navigation.goBack()
        }}
      />
    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  sheetContainerContent: {
    alignItems: 'flex-end',
    width: '100%'
  },
  budgetDistribution: {
    // backgroundColor: 'blue',
    height: "40%",
    width: '100%',
    // marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 30
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    marginTop: 30,
    paddingBottom: 30
  },
  submitBtn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    borderRadius: 60,
  },
  submitText: {
    fontSize: 20,
    fontFamily: "norms-medium",
    textAlign: "center",
  },
  descriptionText: {
    opacity: .25,
    fontFamily: 'norms-regular'
  }
})