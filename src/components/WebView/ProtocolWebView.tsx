import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import WebView from '.';
import wrapIntoHtml from './wrapIntoHtml';

export default function ProtocolWebView({
  content = '',
  style,
}: {
  content: string;
  style?: StyleProp<ViewStyle>;
}) {
  const html = wrapIntoHtml(content);
  return (
    <WebView
      key={html.length}
      style={[styles.webview, style]}
      source={{html}}
      javaScriptEnabled={false}
      dataDetectorTypes="none"
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
