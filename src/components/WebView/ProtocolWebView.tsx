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
      // 如果 html.length 不足以区分，再考虑 MD5 摘要
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
