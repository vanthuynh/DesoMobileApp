import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import DesoLogin from "../components/DesoLogin";
// import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableHighlight, Image, StatusBar, FlatList } from "react-native";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { COLORS, FONTS, SIZES, SHADOWS, assets } from "../constants";
import { CircleButton, RectButton, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
// import FormInput from "../components/FormInput";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const LogIn = ({ navigation }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [publicKey, setSetPublicKey] = useState(null);
  const [desoIdentity, setDesoIdentity] = useState(null);

  // const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://192.168.12.194:5000/getGeofence/MAC')
    .then(response => {
      const res = response.data;
      // setUserProfile({account});
      console.log(res);
    })
    .catch((error)=> {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    })
  }, [])

  const handleSignUp = () => {
    return 0;
  }

  const handleLogin = () => {
    return 0;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.title}>
        <Text>Welcome to Deso Express</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DesoLogin", {navigation})}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LogIn;

const styles = StyleSheet.create({
  title: {
    backgroundColor: COLORS.red,
    fontWeight: 'bold',
    fontSize: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: COLORS.white,
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})