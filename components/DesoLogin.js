import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class DesoLogin extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://identity.deso.org/derive?callback=auth://derive'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}