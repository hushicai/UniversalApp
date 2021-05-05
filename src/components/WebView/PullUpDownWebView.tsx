import React from 'react';
import getScrollHeight from './getScrollHeight';
import WebView from '.';
import iife from './iife';
import {WebViewProps} from './types';
import getScrollTop from './getScrollTop';
import getClientHeight from './getClientHeight';

declare global {
  interface Window {
    getScrollHeight: () => number;
    getClientHeight: () => number;
    getScrollY: () => number;
    ReactNativeWebView: any;
  }
}

function inject() {
  let startY: number;
  const DISTANCE_THRESHOULD = 10;
  const MOVE_THRESHOLD = 20;
  document.body.addEventListener('touchstart', ({touches}) => {
    startY = touches[0].pageY;
  });
  function onEnd(event: TouchEvent) {
    const {changedTouches} = event;
    const touch = changedTouches[0];
    const endY = touch.pageY;
    const docHeight = window.getScrollHeight();
    const clientHeight = window.getClientHeight();
    const scrollY = window.getScrollY();
    console.log('[onEnd]', docHeight, scrollY, clientHeight, startY, endY);
    if (scrollY < DISTANCE_THRESHOULD && endY > startY && endY >= startY + MOVE_THRESHOLD) {
      window.ReactNativeWebView &&
        window.ReactNativeWebView.postMessage(JSON.stringify({func: 'pullDown'}));
    } else if (
      docHeight - (scrollY + clientHeight) < DISTANCE_THRESHOULD &&
      endY < startY &&
      endY <= startY + MOVE_THRESHOLD
    ) {
      window.ReactNativeWebView &&
        window.ReactNativeWebView.postMessage(JSON.stringify({func: 'pullUp'}));
    }
  }
  document.body.addEventListener('touchcancel', onEnd);
  document.body.addEventListener('touchend', onEnd);
}

export default function WebViewWithPullUpDown(props: WebViewProps) {
  return (
    <WebView
      {...props}
      // 注入依赖
      extraJS={`
        window.getScrollY=${getScrollTop.toString()};
        window.getClientHeight=${getClientHeight.toString()};
        window.getScrollHeight = ${getScrollHeight.toString()};
        ${iife(inject)}
      `}
    />
  );
}
