import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../components/Button';
import { HeaderModal } from '../components/HeaderModal';
import { addBudgetGroup } from '../store/actions/budgetActions';
import { idGenerator } from '../../assets/idGenerator';
import { loadPercents } from '../../assets/loadPercents';

export const AddBudgetGroupScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState("");
  const [groupPercent, setGroupPercent] = useState(40);
  const [percents, setPercents] = useState([]);
  // const [groupMoney, setGroupMoney] = useState();

  useLayoutEffect(() => {
    navigation.setOptions(
      HeaderModal(navigation, "Создать группу"),
    );

    setPercents(loadPercents());
  }, []);
  
  const { colors } = useTheme();
  const dispatch = useDispatch();

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
            value={groupName}
            onChangeText={(text) => {
              setGroupName(text);
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
        iconName="checkmark"
        iconSize={30}
        iconColor={colors.primary}
        onPress={() => {
          dispatch(addBudgetGroup(groupName, groupPercent, idGenerator()))
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
  descriptionText: {
    opacity: .25,
    fontFamily: 'norms-regular'
  }
})