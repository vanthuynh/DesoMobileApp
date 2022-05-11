import React from 'react'
import { View, SafeAreaView, Text } from "react-native";


const Listing = ({ route }) => {

  if (route.params) {
    const userProfile = route.params;
    console.log(userProfile);
  }
  return (
    <Text>Listing</Text>
  );
};

export default Listing;
