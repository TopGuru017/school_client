import React from 'react';
import { useState, useEffect, useContext } from 'react';
import './PopularProject.css';
import Factors from './Factors';
import { SearchContext } from '../App';

function PopularProject() {
  const {searchtext, setSearchtext} = useContext(SearchContext);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [projectArray, setProjectArray] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/get_popular_project`, {
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
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

  return (
    <div className={scrollVisible ? 'scroll-visible': 'scroll-hidden'}>
      <div className='describetext'>
        <p>注目のプロジェクト</p>
        <p style={{ cursor : "pointer" }} onClick={() => setScrollVisible(!scrollVisible)}>もっと見る</p>
      </div>
      <Factors factors={projectArray} />
    </div>
  );
}

export default PopularProject;
