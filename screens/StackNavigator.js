import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Details from "./Details";




const Stack = createStackNavigator();

const StackNavigator = () => (

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator> 
   
  );
   

export default StackNavigator;
