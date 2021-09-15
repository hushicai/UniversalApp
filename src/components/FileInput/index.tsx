import React, {RefObject, useCallback} from 'react';
import {createElement} from 'react-native';

const Input = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const {children, ...rest} = props;
  return createElement('input', {ref, ...rest}, children);
});

const FileInput = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const {onChange, accept, ...rest} = props;
  const onChangeCallback = useCallback(
    e => {
      let event = e.nativeEvent;
      let target = event.target;
      let file = target.files[0];

      if (file && file.type.match(new RegExp(accept, 'i'))) {
        onChange(file);
      }

      target.value = '';
    },
    [onChange, accept]
  );

  return <Input {...rest} type="file" accept={accept} onChange={onChangeCallback} ref={ref} />;
});

export function clickInput(ref: RefObject<HTMLInputElement>) {
  const input = ref && ref.current;
  if (input) {
    let event = document.createEvent('MouseEvents');
    // @ts-ignore
    event.initMouseEvent('click', false, true);
    input.dispatchEvent(event);
  }
}

export default FileInput;
