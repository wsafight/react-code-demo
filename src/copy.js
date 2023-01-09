import React, { useRef } from 'react';
import { copyTextToClipboard, copyFileToClipboard ,readTextFromClipboard } from 'clipboard-helper'

function App() {
  const handleCopy = () => {
    copyTextToClipboard('bb').then(res => {
      console.log('test-res', res);
    }).catch(err => {
      console.log('test-err', err);
    })
  }

  const bb = useRef(null);

  const handleCopy2 = () => {
    copyFileToClipboard('https://img.alicdn.com/bao/uploaded/i4/1959203576/O1CN01Fao8rf1cHr5JWAzuy_!!1959203576.png').then(res => {
      console.log('test-res', res);
    }).catch(error => {
      console.log('test-err', error)
    })
  }


  const handleCopy3 = () => {
    const img = document.getElementById('image');
    console.log('tt', img);
    console.log(img instanceof HTMLImageElement);
    copyFileToClipboard(bb.current).then(res => {
      console.log('test-res', res);
    }).catch(error => {
      console.log('test-err', error)
    })
  }

  const handleCopy4 =() => {
    readTextFromClipboard().then(res => {
      console.log('wsa-res', res);
    })
  }

  return (
    <div className="App">
      <button onClick={handleCopy} >拷贝</button>

      <button onClick={handleCopy2} >拷贝图片</button>
      <img id='image' ref={bb} width={200} src='https://img.alicdn.com/bao/uploaded/i4/1959203576/O1CN01Fao8rf1cHr5JWAzuy_!!1959203576.png' />

      <button onClick={handleCopy3} >拷贝图片3</button>
      <button onClick={handleCopy4} >获取文本</button>
    </div>
  );
}
export default App;