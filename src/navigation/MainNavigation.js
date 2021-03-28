import React, { useEffect, useState } from "react";
import { useColorScheme } from 'react-native';

import { 
  NavigationContainer, 
  DefaultTheme,
  DarkTheme, 
  useTheme,
} from "@react-navigation/native";

import {
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { createStackNavigator } from '@react-navigation/stack';

import theme from "../theme";
import { HomeScreen } from "../screens/HomeScreen";
import { AddBudgetGroupScreen } from "../screens/AddBudgetGroupScreen";
import { EditBudgetGroupScreen } from "../screens/EditBudgetGroupSreen";

export const MainNavigation = ({ navigation }) => {
  const Stack = createStackNavigator();
  const scheme = useColorScheme();
  
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(10, 13, 18)',
      secondary: '#fff',
      tertiary: 'rgba(255, 255, 255, .75)',
      btn_primary: "rgba(255, 255, 255, .05)",
      quaternary: "rgba(255, 255, 255, .05)",
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#fff',
      secondary: 'rgb(10, 13, 18)',
      tertiary: 'rgba(0, 0, 0, .75)',
      btn_primary: "rgba(0, 0, 0, .05)",
      quaternary: "rgba(0, 0, 0, .05)",
    },
  };

  const modalOptions = {
    headerShown: false,
    gestureEnabled: true,
    cardOverlayEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    ...TransitionPresets.ModalPresentationIOS,
  };

  const MainStack = () => {
    const { colors } = useTheme();

    return(
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            shadowColor: "transparent",
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.quaternary,
          },
          headerBackTitle: "Назад",
          headerTintColor: colors.secondary,
          cardStyle: {
            backgroundColor: colors.primary
          }
        }}
        headerMode="screen"
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen 
          name="AddBudgetGroupScreen" 
          component={AddBudgetGroupScreen} 
          options={modalOptions}
        />
        <Stack.Screen 
          name="EditBudgetGroupScreen" 
          component={EditBudgetGroupScreen} 
          options={modalOptions}
        />
      </Stack.Navigator>
    )
  };
  
  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <MainStack />
    </NavigationContainer>
  )
};