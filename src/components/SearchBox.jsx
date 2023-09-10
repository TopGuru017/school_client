import React from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search_icon.svg';
import './SearchBox.css'
import { useContext } from 'react';
import { LanguageContext, SearchContext } from '../App';


function SearchBox() {
  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  const {searchtext, setSearchtext} = useContext(SearchContext);
  let dic_data = require('../assets/dictionary.json');
  const handleChange = (event) => {
    setSearchtext(event.target.value)

  }


  return (
    <div className='searchbox-wrapper'>
      <input type='text' placeholder={dic_data.search[currentlang]} onChange={handleChange}/>
      <span style={{ cursor: "pointer" }}><SearchIcon /></span>
    </div>
  );
}

export default SearchBox;
