import React from 'react';
import PullUpDownWebView from './components/WebView/PullUpDownWebView';

function App() {
  return (
    <PullUpDownWebView
      pullUp={payload => console.log(payload)}
      pullDown={payload => console.log(payload)}
      source={{
        html: `
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      `
      }}
    />
  );
}

export default App;
