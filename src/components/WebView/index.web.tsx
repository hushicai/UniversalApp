/* global parent */
import React, {Component} from 'react';
import {StyleSheet, View, createElement} from 'react-native';
import iife from './iife';
import parseMessage from './parseMessage';
import {WebViewProps} from './types';

function hackPostMessage() {
  // @ts-ignore
  window.ReactNativeWebView = parent;
  const __postMessage = parent.postMessage;
  parent.postMessage = function (data: any) {
    return __postMessage(data, '*');
  };
}

class WebView extends Component<WebViewProps> {
  iframeRef: HTMLIFrameElement | null = null;
  setRef = (ref: HTMLIFrameElement) => (this.iframeRef = ref);
  id = '';
  constructor(props: WebViewProps) {
    super(props);
    this.id = '__iframe__' + Date.now();
  }
  componentDidMount() {
    window.addEventListener('message', this.onMessage, true);
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.onMessage, true);
  }

  onMessage = (event: MessageEvent) => {
    const {data} = event;
    const fakeEvent = {nativeEvent: {data}};
    // @ts-ignore
    return parseMessage(fakeEvent, this.props);
  };

  onLoad = () => {
    let {extraJS} = this.props;
    if (extraJS && this.iframeRef) {
      const injectedJS = `
        window.__iframe_id = "${this.id}";
        ${iife(hackPostMessage)};
        ${extraJS}
      `;
      // @ts-ignore
      this.iframeRef.contentWindow.eval(injectedJS);
    }
  };

  render() {
    let {source, onError, style} = this.props;

    if (!source) {
      return null;
    }

    const flatternStyle = StyleSheet.flatten(style) || {};
    const {height, ...rest} = flatternStyle;
    const viewStyle = height ? [{height}, styles.wrapper] : styles.scrollWrapper;
    const frameStyle = height ? {height} : {};
    let attributes = {
      width: '100%',
      height: '100%',
      frameBorder: '0',
      onLoad: this.onLoad,
      onError,
      ref: this.setRef,
      style: [styles.iframe, frameStyle],
      id: this.id,
    };
    let iframe = null;

    if ('uri' in source) {
      iframe = createElement('iframe', {
        src: source.uri,
        ...attributes,
      });
    } else if ('srcdoc' in document.createElement('iframe')) {
      iframe = createElement('iframe', {
        srcDoc: source.html,
        ...attributes,
      });
    } else {
      iframe = createElement('iframe', {
        src: 'javascript:' + source.html,
        ...attributes,
      });
    }

    // @ts-ignore
    return <View style={[styles.wrapper, viewStyle, rest]}>{iframe}</View>;
  }
}

const styles = StyleSheet.create({
  // auto height的webview，不需要滚动，否则部分浏览器父元素无法滚动
  wrapper: {
    overflow: 'hidden',
  },
  // @see: https://bugs.webkit.org/show_bug.cgi?id=149264
  // 手机上需要包裹一个scroll元素才能滚动
  scrollWrapper: {
    flexGrow: 1,
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
  iframe: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderWidth: 0,
  },
});

export default WebView;
