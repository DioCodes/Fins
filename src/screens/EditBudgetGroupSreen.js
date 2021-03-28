import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderModal } from '../components/HeaderModal';
import { Button } from '../components/Button';
import { loadPercents } from '../../assets/loadPercents';
import { changeBudgetGroup, removeBudgetGroup } from '../store/actions/budgetActions';

export const EditBudgetGroupScreen = ({ route, navigation }) => {
  const { groupName, groupId, groupPercent } = route.params;

  const [newGroupName, setNewGroupName] = useState(groupName);
  const [newGroupPercent, setNewGroupPercent] = useState(groupPercent);
  const [percents, setPercents] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions(
      HeaderModal(navigation, `Редактировать группу`),
    );

    setPercents(loadPercents())
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
          selectedValue={newGroupPercent}
          onValueChange={(itemValue, itemIndex) =>
            setNewGroupPercent(itemValue)
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
          iconName="trash-outline"
          iconSize={30}
          iconColor={colors.secondary}
          style={{ borderWidth: 1, borderColor: colors.secondary, backgroundColor: 'transparent' }}
          onPress={() => {
            dispatch(removeBudgetGroup(groupId))
            navigation.goBack()
          }}
        />
        <Button 
          iconName="checkmark"
          iconSize={30}
          iconColor={colors.primary}
          onPress={() => {
            dispatch(changeBudgetGroup(newGroupName, newGroupPercent, groupId))
            navigation.goBack()
          }}
        />
      </View>

    </View> 
  )
};

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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30
  },
  descriptionText: {
    opacity: .25,
    fontFamily: 'norms-regular'
  }
})