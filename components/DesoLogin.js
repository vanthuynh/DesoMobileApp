// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Home from '../screens/Home';

// const onNavigationStateChange = (navigationState: WebViewNavigation) => {
//   const url = navigationState.url;

//   // parseURLParams is a pseudo function.
//   // Make sure to write your own function or install a package
//   const params = parseURLParams(url);

//   if (params.token) {
//     // Save token for native requests & move to the next screen
//   }
// };

// export default class DesoLogin extends Component {
//   handleNavigationStateChange() {
//     useNavigation.navigate("Home");
//   }
//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <WebView
//           source={{
//             uri: 'https://identity.deso.org/derive?callback=auth://derive'
//           }}
//           // onNavigationStateChange={handleNavigationStateChange()}
//           style={{ marginTop: 20 }}
//         />
//       </SafeAreaView>
//     );
//   }
// }
function parseURLParams(url) {

  return result;
}
const DesoLogin = () =>{
  const navigation = useNavigation();
  // const webView = WebView();
  const [signIn, setSignIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  // function onMessage(data) {
  //   alert(data.nativeEvent.data);
  // }

  // const handleLogin = (e) => {
  //   const data = webView.getUrl(e);
  //   setUserProfile(data)
  // }

  const handleNavigationStateChange = () => {
    navigation.navigate("Home", {userProfile});
  }

  const onNavigationStateChange = (navigationState : WebViewNavigation) => {
    if (userProfile!==navigationState.url) {
      console.log('**********************************************');
      console.log(navigationState);
      console.log('**********************************************');
      setUserProfile(navigationState);
      // console.log(userProfile);
    }
  };

  // update userProfile and pass on to Home screen
  useEffect(() => {
    setSignIn(true);
    if (userProfile) {
      // var access_token = new URLSearchParams(userProfile.search).get('derivedSeedHex');
      console.log('=============================================')
      // console.log(access_token);
      console.log(userProfile);
      console.log('=============================================')
      // handleNavigationStateChange();
    }
  },[userProfile])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          // uri: 'https://identity.deso.org/derive?callback=auth://derive?webview=true'
          uri: 'https://identity.deso.org/derive?callback=auth://derive'
          // uri: 'https://identity.deso.org/derive?webview=true'
        }}
        // onMessage={onMessage}s
        // injectedJavaScript={handleLogin}
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}
export default DesoLogin;