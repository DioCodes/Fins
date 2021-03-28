import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { AppHeaderIcon } from "./AppHeaderIcon";
import theme from "../theme";

const Header = ({ navigation }) => {
  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        iconName="ios-close-sharp"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </HeaderButtons>
  );
};


export const HeaderModal = (navigation, header, icon) => {  
  return (
    {
      headerShown: true,
      headerTitle: header,
      headerLeft: () => {},
      headerRight: () => <Header navigation={navigation} />,
      headerStatusBarHeight: 0,
    }
  )
};
