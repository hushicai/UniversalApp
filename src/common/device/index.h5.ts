import isIPhone12Like from './isIphone12Like';
import isIPhoneXRSize from './isIPhoneXRLike';
import isIPhoneXLike from './isIPhoneXLike';

const ua = navigator.userAgent;

export const isAndroid = !/like android/i.test(ua) && /android/i.test(ua);
export const isIOS = /(ipod|iphone|ipad)/i.test(ua);

export const isIPhoneX = isIOS && isIPhoneXLike();
export const isIPhoneXR = isIOS && isIPhoneXRSize();
export const isIphone12 = isIOS && isIPhone12Like();
