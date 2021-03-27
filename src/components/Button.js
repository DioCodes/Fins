import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';

import theme from '../theme';

export const Button = ({ 
  onPress, 
  iconName,
  iconSize = 30,
  iconColor,
  text,
  textStyle,
  style = styles.mainContainer, 
}) => {
  const onPressHandler = () => {
    onPress();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{ ...style }}
      activeOpacity={theme.ACTIVE_OPACITY}
      onPress={onPressHandler}
    >
      <View style={styles.btnCont}>
        {iconName ? <Ionicons name={iconName} size={iconSize} color={iconColor || colors.secondary} /> : null}
        {text ? <Text style={[ styles.header, {color: colors.primary}, textStyle ]}>{text}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btnCont: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    fontSize: 16,
    fontFamily: 'norms-bold',
  },
});