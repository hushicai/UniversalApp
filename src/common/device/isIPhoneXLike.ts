import isSameDimensions from './isSameDimensions';
import devices from './devices';

export default function isIPhoneXLike() {
  return isSameDimensions(devices.iPhoneX);
}
