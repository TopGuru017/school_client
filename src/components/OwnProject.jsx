import React from 'react';
import { useRef,useEffect, useState, useContext } from 'react';
import './OwnProject.css';
import OwnFactors from './OwnFactors';
import { LanguageContext, SearchContext } from '../App';
import axios from 'axios';

function OwnProject() {
  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
  const {searchtext, setSearchtext} = useContext(SearchContext);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [projectArray, setProjectArray] = useState([]);
  const fileInput = useRef(null);
  useEffect(() => {
    fetch('/api/get_own_project', {
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
    
    const url = '/api/upload';
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

      alert(dic_data.alert_upload_success[currentlang]);
    }
    else {
      alert(dic_data.alert_upload_failed[currentlang]);
    }
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
  };
  return (
    <div className={scrollVisible ? 'scroll-visible' : 'scroll-hidden'}>
      <div className='describetext'>
        <p>{dic_data.own_project[currentlang]}</p>
        <div style={{ marginRight: "60px" }}>
        <input type="file" ref={fileInput} onChange={onFileChange} style={{ display: 'none' }} accept=".sb3"/>
          <button className='normal' onClick={onButtonClick}>{dic_data.upload[currentlang]}</button>
        </div>
        <p style={{ cursor : "pointer" }} onClick={() => setScrollVisible(!scrollVisible)}>もっと見る</p>
      </div>
      <OwnFactors factors={projectArray} />
    </div>
  );
}

export default OwnProject;
