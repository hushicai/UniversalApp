import isSameDimensions from './isSameDimensions';
import devices from './devices';

export default function isIPhoneXRSize() {
  return isSameDimensions(devices.iPhoneXR);
}
