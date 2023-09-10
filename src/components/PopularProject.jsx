import React from 'react';
import { useState, useEffect, useContext } from 'react';
import './PopularProject.css';
import Factors from './Factors';
import { LanguageContext, SearchContext } from '../App';

function PopularProject() {
  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
  const {searchtext, setSearchtext} = useContext(SearchContext);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [projectArray, setProjectArray] = useState([]);
  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL)
    fetch('/api/get_popular_project', {
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
        <p>{dic_data.popular_project[currentlang]}</p>
      </div>
      <Factors factors={projectArray} />
    </div>
  );
}

export default PopularProject;
