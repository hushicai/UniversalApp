import React from 'react';
import RawWebView from 'react-native-webview';
import parseMessage from './parseMessage';
import {WebViewProps} from './types';

function WebView(p: WebViewProps) {
  const {extraJS, ...rest} = p;
  const props = {...rest};
  if (extraJS) {
    props.javaScriptEnabled = true;
    // android will remove all newline
    // you should use semicolon
    props.injectedJavaScript = `
      ${extraJS}
    `;
    props.onMessage = event => {
      return parseMessage(event, props);
    };
  }
  return (
    // https://github.com/react-native-community/react-native-webview/issues/101
    // https://github.com/react-native-community/react-native-webview/issues/429
    <RawWebView
      {...props}
      originWhitelist={['*']}
      useWebKit
      // hardwareAccelerationEnabledExperimental={false}
      // style={[Platform.OS === 'android' && { opacity: 0.99 }, props.style]}
      // source={{ ...props.source, ...(Platform.OS === 'android' && { baseUrl: '' }) }}
    />
  );
}

export default WebView;
