import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


import List from "./Listing"
import Account from "./Account"
import StackNavigator from "./StackNavigator";
import Listing from "./Listing";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator  screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Tab.Screen name="Home" 
      component={StackNavigator} 
      options={{ tabBarIcon : ({color, size}) =>
      
       <Icons name ="home" color={color} size={size}/> }}

      />
      <Tab.Screen name="List" component={Listing} 
        options={{ tabBarIcon : ({color, size}) =>
      
      <Icons name ="plus-circle" color={color} size={size}/> }}
      />
      <Tab.Screen name="Account" component={Account} 
        options={{ tabBarIcon : ({color, size}) =>
      
      <Icons name ="account" color={color} size={size}/> }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;