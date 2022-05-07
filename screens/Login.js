import React from 'react'
import { SafeAreaView } from "react-native";
import {FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import {LoginButton} from "../components/Button";



const Login = () => {
  return (
      <SafeAreaView style={{flex:1,justifyContent: "center",alignItems: "center"}}>
          <FocusedStatusBar backgroundColor={COLORS.primary} />
          <LoginButton/>
      </SafeAreaView>
  )
}

export default Login;