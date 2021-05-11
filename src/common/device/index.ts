import {Platform} from 'react-native';
import isIPhone12Like from './isIphone12Like';
import isIPhoneXRSize from './isIPhoneXRLike';
import isIPhoneXLike from './isIPhoneXLike';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isIPhoneX = isIOS && isIPhoneXLike();
export const isIPhoneXR = isIOS && isIPhoneXRSize();
export const isIphone12 = isIOS && isIPhone12Like();
