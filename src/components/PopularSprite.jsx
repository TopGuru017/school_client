import React from 'react';
import { useState, useEffect } from 'react';
import './PopularSprite.css';
import Factors from './Factors';
import { useContext } from 'react';
import { LanguageContext, SearchContext } from '../App';
let data = require('../assets/dictionary.json');

function PopularSprite() {
  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
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
        <p>{dic_data.popular_sprite[currentlang]}</p>
      </div>
      <Factors factors={projectArray} />
</div>
  );
}

export default PopularSprite;
