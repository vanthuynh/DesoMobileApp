import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./Home"
import Account from "./Account"
import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator  screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default MyTabs;