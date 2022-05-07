// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Home from '../screens/Home';
import axios from 'axios';

// const onNavigationStateChange = (navigationState: WebViewNavigation) => {
//   const url = navigationState.url;

//   // parseURLParams is a pseudo function.
//   // Make sure to write your own function or install a package
//   const params = parseURLParams(url);

//   if (params.token) {
//     // Save token for native requests & move to the next screen
//   }
// };
function parseURLParams(url) {

  return result;
}
const DesoLogin = () =>{
  const axios = require('axios');
  const navigation = useNavigation();
  // const webView = WebView();
  const [signIn, setSignIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  function onMessage(data) {
    alert(data.nativeEvent.data);
  }

  // const handleLogin = (e) => {
  //   const data = webView.getUrl(e);
  //   setUserProfile(data)
  // }

  const handleNavigationStateChange = () => {
    navigation.navigate("Home", {userProfile});
  }

  const onNavigationStateChange = (navigationState : WebViewNavigation) => {
    const url = navigationState.url;

    // const params = parseURLParams(url);
    axios.get('/auth://derive')
    .then(response => {
      const account = response.data;
      setUserProfile({account});
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
    if (userProfile!==url) {
      console.log('**********************************************');
      console.log(url);
      console.log('**********************************************');
      setUserProfile(url);
    }
    axios.get('/auth://derive')
    .then(response => {
      const account = response.data;
      setUserProfile({account});
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
  };

  // update userProfile and pass on to Home screen
  useEffect(() => {
    setSignIn(true);
    axios.get('/auth://derive')
    .then(response => {
      const account = response.data;
      setUserProfile({account});
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
    if (userProfile) {
      // var access_token = new URLSearchParams(userProfile.search).get('derivedSeedHex');
      console.log('+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+')
      // console.log(access_token);
      console.log(userProfile);
      console.log('+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+')
      // handleNavigationStateChange();
    }
  },[userProfile])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          // uri: 'https://identity.deso.org/derive?callback=auth://derive?webview=true'
          // uri: 'https://identity.deso.org/derive?callback=...?'
          // uri: 'https://identity.deso.org/derive?callback=auth://derive'
          uri: 'https://identity.deso.org/derive?callback=https://node.deso.org'
          // uri: 'https://identity.deso.org/derive?webview=true'
        }}
        onMessage={onMessage}
        injectJavaScript={onNavigationStateChange}
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}
export default DesoLogin;