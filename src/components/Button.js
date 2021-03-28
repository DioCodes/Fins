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
  style, 
}) => {
  const onPressHandler = () => {
    onPress();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{ backgroundColor: colors.secondary, ...styles.mainContainer, ...style }}
      activeOpacity={theme.ACTIVE_OPACITY}
      onPress={onPressHandler}
    >
      <View style={styles.btnCont}>
        {iconName ? 
          <Ionicons 
            name={iconName} 
            size={iconSize} 
            color={iconColor || colors.secondary} 
            style={{
              lineHeight: 50,
              height: 50,
              width: 50,
              textAlign: "center",
            }}
          /> 
        : null}

        {text ? <Text style={[ styles.header, {color: colors.primary}, textStyle ]}>{text}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    borderRadius: 30,
  },
  btnCont: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 16,
    fontFamily: 'norms-medium',
  },
});