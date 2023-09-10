import React from 'react';
import { useContext,useEffect, useState, useRef } from 'react';
import './OwnSprite.css';
import OwnFactors from './OwnFactors';
import axios from 'axios';
import { SearchContext } from '../App';

function OwnSprite() {
  const {searchtext, setSearchtext} = useContext(SearchContext)
  const [scrollVisible, setScrollVisible] = useState(false);
  const [projectArray, setProjectArray] = useState([]);
  const fileInput = useRef(null);
  useEffect(() => {
    fetch('/api/get_own_sprite', {
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        searchtext
      }) 
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      setProjectArray(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [searchtext]);

  const onButtonClick = () => {
    // Programmatically click the hidden file input
    fileInput.current.click();
  };
  const onFileChange = async (e) => {
    
    const url = '/api/upload_sprite';
    console.log("URL is" ,url);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    // formData.append('fileName', file.name);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    const response = await axios.post(url, formData, config);
    console.log(response)
    if(response.status === 200){
      console.log("SUCESF")
      // const res = await response.json();
      alert('アップロードが成功しました。');
    }
    else {
      alert('アップロードが失敗しました。');
    }
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
  };

  return (
    <div className={scrollVisible ? 'scroll-visible' : 'scroll-hidden'}>
      <div className='describetext'>
        <p>自分の部品</p>
        <div>
        <input type="file" ref={fileInput} onChange={onFileChange} style={{ display: 'none' }} accept=".sprite3" />
          <button className='normal' onClick={onButtonClick}>アップロード</button>
        </div>
        <p style={{ cursor : "pointer" }} onClick={() => setScrollVisible(!scrollVisible)}>もっと見る</p>
      </div>
      <OwnFactors factors={projectArray} />
    </div>
  );
}

export default OwnSprite;
