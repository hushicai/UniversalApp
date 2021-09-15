import {WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';
import {WebViewCustomFunctionName, WebViewProps} from './types';

export default function parseMessage(event: WebViewMessageEvent, props: WebViewProps) {
  const {
    nativeEvent: {data: eventData}
  } = event;
  const {onMessage, ...rest} = props;
  try {
    const json = JSON.parse(eventData);
    if (typeof json === 'object') {
      const {func, payload}: {func: string; payload: any} = json;
      if (typeof func === 'string') {
        const fn = rest[func as WebViewCustomFunctionName];
        if (typeof fn === 'function') {
          console.log('[onMessage]', func);
          fn(payload);
        }
        return;
      }
    }
    // fallback
    onMessage && onMessage(event);
  } catch (ignore) {
    // fallback
    onMessage && onMessage(event);
  }
}
