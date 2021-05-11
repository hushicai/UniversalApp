import isSameDimensions from './isSameDimensions';
import devices from './devices';

export default function isIPhone12Like() {
  return isSameDimensions(devices.iPhone12) || isSameDimensions(devices.iphone12Max);
}
