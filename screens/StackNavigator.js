import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./Home";
import Details from "./Details";




const Stack = createStackNavigator();

const StackNavigator = () => (

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Listing" component={HomeStack} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator> 
   
  );
   

export default StackNavigator;
