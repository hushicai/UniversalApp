import {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, Keyboard} from 'react-native';

const notEditableInputType = ['file', 'checkbox', 'radio', 'reset', 'image', 'submit', 'button'];

export default function useKeyboard() {
  const [shown, setShown] = useState(false);

  const focusListener = useCallback((e: FocusEvent) => {
    console.log('[keyboard] focus', e);
    const target = (e && e.target) as HTMLElement;
    if (target) {
      const tagName = target.nodeName;
      if (tagName === 'INPUT') {
        const inputType = target.getAttribute('type');
        if (inputType) {
          if (notEditableInputType.includes(inputType)) {
            // nothing
          } else {
            setShown(true);
          }
        }
      } else if (tagName === 'TEXTAREA') {
        setShown(true);
      }
    }
  }, []);
  const blurListener = useCallback(e => {
    console.log('[keyboard] blur', e);
    setShown(false);
  }, []);

  const originHeight = Dimensions.get('window').height;
  const ref = useRef<number>(0);
  ref.current = originHeight;
  // blur的时机可能比较晚
  // 增加一个resize判断协助blur
  // 误判也没关系，界面展示正常即可
  const resizeListener = useCallback(() => {
    const height = Dimensions.get('window').height;
    console.log('[keyboard] resize', height, ref.current);
    // 高度变小了，键盘可能收起来了
    // 当然也可能是横竖屏切换了
    // 可能会误判
    // 如果是横竖屏切换，强制收起键盘，问题也不大
    if (height < ref.current) {
      Keyboard.dismiss();
    }
  }, []);

  useEffect(() => {
    // focus和blur事件可以在捕获阶段监听，不能在冒泡阶段监听
    document.addEventListener<'focus'>('focus', focusListener, true);
    document.addEventListener<'blur'>('blur', blurListener, true);
    window.addEventListener('resize', resizeListener, false);
    return () => {
      document.removeEventListener('focus', focusListener, true);
      document.removeEventListener('blur', blurListener, true);
      window.removeEventListener('resize', resizeListener, false);
    };
  }, [blurListener, focusListener, resizeListener]);

  return {
    keyboardShown: shown,
    coordinates: {start: {}, end: {height: 0}}
  };
}
