import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import theme from '../theme';

export const Button = ({ 
  onPress, 
  iconName,
  iconSize,
  text,
  style = styles.mainContainer, 
}) => {
  const onPressHandler = () => {
    onPress();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TouchableOpacity
      style={{ style}}
      activeOpacity={theme.ACTIVE_OPACITY}
      onPress={onPressHandler}
    >
      <View style={styles.btnCont}>
        <Ionicons name={iconName} size={iconSize} color="white" />
        {text ? <Text style={styles.header}>{text}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.BTN_PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btnCont: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'norms-bold',
  },
});