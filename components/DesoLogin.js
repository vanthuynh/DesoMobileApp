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

  const onNavigationStateChange = e => {
    if (userProfile!==e.url) {
      console.log(e.url);
      setUserProfile(e.url);
      console.log(userProfile);
    }
  };

  // update userProfile and pass on to Home screen

  useEffect(() => {
    setSignIn(true);
    if (userProfile) {
      handleNavigationStateChange();
    }
  },[userProfile])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: 'https://identity.deso.org/derive?callback=auth://derive'
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