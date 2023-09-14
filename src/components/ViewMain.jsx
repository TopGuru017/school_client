import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../App';
import { ViewContext } from './View';
import './View.css';
import { LanguageContext } from '../App';

function ViewMain() {

  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
  const {searchtext, setSearchtext} = useContext(SearchContext);
  const [dataArray, setDataArray] = useState([]);
  const {viewstate, setViewstate} = useContext(ViewContext);
  const [showdetail, setShowdetail] = useState(false);
  const [info, setInfo] = useState();

  useEffect(() => {
    fetch(`/api/${viewstate}`, {
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        searchtext
      }) 
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      setDataArray(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [searchtext, viewstate]);

  const handleView = (factor) => {
    setShowdetail(true);
    setInfo(factor);
  }
  const handleChange = (str) => {
    setViewstate(str);
    setShowdetail(false);
  }

  const handleOpenEditor = () => {
    console.log('OK')
    window.location.href=`http://localhost:3001?file_path=${'This'}`
  }

  return (

    <>
    <div class="tab">
    <button class="tablinks" onClick={() => handleChange('get_popular_project')}>{dic_data.project[currentlang]}</button>
    <button class="tablinks" onClick={() => handleChange('get_own_project')}>{dic_data.studio[currentlang]}</button>
    <button class="tablinks" onClick={() => handleChange('get_popular_sprite')}>{dic_data.sprite[currentlang]}</button>
    <button class="tablinks" onClick={() => handleChange('get_own_sprite')}>{dic_data.studio[currentlang]}</button>
    </div>
    <div className='viewmain-wrapper'>

      {!showdetail &&
        dataArray.map((factor, index) => (
          <div className='view-factor' onClick={() => handleView(factor)}>
            <img src = {`/api/${factor.icon}`} alt = {factor.name} />
            <p>{factor.name}</p>
            <p>{factor.username}</p>
          </div>
        ))
      }
      
    </div>
    {
        showdetail && 
        <div className='view-detail'>
          <div className='view-detail-header'>
            <div>
              <p style={{ fontSize : "25px" }}>{info.name}</p>
              <p style={{ fontSize : "20px" }}>by {info.username}</p>
            </div>
            <div><button onClick={handleOpenEditor}>中を見る</button></div>  
          </div>
          <div className='view-detail-content'>
            <div className='view-detail-img'><img src = {`/api/${info.icon}`} alt = {info.name} /></div>
            <div style={{ marginTop : "20px" }}>
              <p>{info.description}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ViewMain;
