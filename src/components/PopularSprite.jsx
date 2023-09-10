import React from 'react';
import { useState, useEffect } from 'react';
import './PopularSprite.css';
import Factors from './Factors';
import { useContext } from 'react';
import { SearchContext } from '../App';

function PopularSprite() {
  const {searchtext, setSearchtext} = useContext(SearchContext);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [projectArray, setProjectArray] = useState([]);
  useEffect(() => {
    fetch('/api/get_popular_sprite', {
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
    <div className={scrollVisible ? 'scroll-visible' : 'scroll-hidden'}>
      <div className='describetext' style={{     height: "20%" }}>
        <p>注目の部品</p>
        <p style={{ cursor : "pointer" }} onClick={() => setScrollVisible(!scrollVisible)}>もっと見る</p>
      </div>
      <Factors factors={projectArray} />
</div>
  );
}

export default PopularSprite;
