import React, {DetailedHTMLProps, InputHTMLAttributes, RefObject, useCallback} from 'react';
import {createElement} from 'react-native';

const ua = navigator.userAgent;
const isAndroid = !/like android/i.test(ua) && /android/i.test(ua);

const Input = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const {children, capture, ...rest} = props;
  const other: {capture?: string} = {};
  switch (capture) {
    case 'camera':
      // bug: https://github.com/facebook/react/issues/11419
      // android设置capture才能拍照
      // ios设置capture不能打开相册
      // 所以这里修正一下，只在android上设置capture
      if (isAndroid) {
        other.capture = capture;
      }
      break;
    default:
  }
  return createElement('input', {ref, ...rest, ...other}, children);
});

const FileInput = React.forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => {
  const {onChange, accept, ...rest} = props;
  const onChangeCallback = useCallback(
    e => {
      let event = e.nativeEvent;
      let target = event.target;
      let file = target.files[0];

      if (file && accept && file.type.match(new RegExp(accept, 'i'))) {
        onChange && onChange(file);
      }

      target.value = '';
    },
    [onChange, accept],
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
