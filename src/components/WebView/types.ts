import type {WebViewProps as RawWebViewProps} from 'react-native-webview';

export type WebViewCustomFunctionName = 'pullDown' | 'pullUp';

type WebViewCustomFunction = {
  [key in WebViewCustomFunctionName]?: (payload: any) => void;
};

export type WebViewProps = RawWebViewProps &
  WebViewCustomFunction & {
    extraJS?: string;
  };
