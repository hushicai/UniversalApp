import React, {Component} from 'react';
import WebView from '.';
import getScrollHeight from './getScrollHeight';
import iife from './iife';
import {WebViewProps} from './types';

type S = {
  height?: number;
};

export default class AutoHeightWebView extends Component<WebViewProps, S> {
  state: S = {};

  render() {
    const {style, ...restProps} = this.props;

    const props = {
      ...restProps,
      extraJS: `window.ReactNativeWebView.postMessage(${iife(getScrollHeight)});`,
      style: [{height: this.state.height || 0}, style]
    };
    props.onMessage = ({nativeEvent: {data}}) => {
      const height = +data;
      if (!isNaN(height)) {
        this.setState({
          height
        });
      }
    };

    return <WebView {...props} />;
  }
}
