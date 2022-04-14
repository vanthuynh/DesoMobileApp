
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, SIZES, SHADOWS, assets } from "../constants";


import Account from "./Account"
import StackNavigator from "./StackNavigator";
import Listing from "./Listing";
import ListingButton from "../components/ListingButton";




const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  return (
    <Tab.Navigator  screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:COLORS.primary,
        tabBarHideOnKeyboard: true,
        
      }}
      initialRouteName="Home"
     >
      <Tab.Screen name="Home" component={StackNavigator} 
        options={{ tabBarIcon : ({color = COLORS.primary, size}) =>
        <Icons name ="home" color={color} size={size}/> }}
      />

      <Tab.Screen 
        name="List" 
        component={Listing} 
        options={{ 
          
          tabBarIcon : ({color, size}) => (
        <Icons name ="plus-circle" color={color} size={size}/>)
         }}
      />
      <Tab.Screen name="Account" component={Account} 
        options={{ tabBarIcon : ({color, size}) =>
    
         <Icons name ="account" color={color} size={size}/> }}
      />
    </Tab.Navigator>
  );
};


export default MyTabs;