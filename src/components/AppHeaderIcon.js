import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";
import { useTheme } from "@react-navigation/native";


export const AppHeaderIcon = (props) => {
  const { colors } = useTheme();

  return(
    <HeaderButton
      {...props}
      iconSize={26}
      IconComponent={Ionicons}
      color={colors.secondary}
    />  
    
  )
};
