import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from "./Home";
import Details from "./Details";
import Account from "./Account"




const Stack = createStackNavigator();

const StackNavigator = () => (
 
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator> 
    
  );
   

export default StackNavigator;
