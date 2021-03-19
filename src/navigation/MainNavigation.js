import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import theme from "../theme";
import { HomeScreen } from "../screens/HomeScreen";

export const MainNavigation = ({ navigation }) => {
  const Stack = createStackNavigator();
  
  const MainStack = () => {
    return(
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.PRIMARY_COLOR,
            shadowColor: "transparent",
            elevation: 0,
          },
          headerBackTitle: "Назад",
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    )
  };
  
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
};