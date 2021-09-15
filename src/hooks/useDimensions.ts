import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

function useDimensions() {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  });
  useEffect(() => {
    function handleChange() {
      setDimensions({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      });
    }
    Dimensions.addEventListener('change', handleChange);
    handleChange();
    return () => window.removeEventListener('change', handleChange);
  }, []);
  return dimensions;
}

export default useDimensions;
