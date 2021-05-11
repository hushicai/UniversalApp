import {Dimensions} from 'react-native';

export default function isSameDimensions(dim: {width: number; height: number}) {
  const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window');
  return Math.min(D_HEIGHT, D_WIDTH) === dim.width && Math.max(D_HEIGHT, D_WIDTH) === dim.height;
}
