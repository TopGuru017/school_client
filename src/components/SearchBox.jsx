import React from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search_icon.svg';
import './SearchBox.css'
import { useContext } from 'react';
import { SearchContext } from '../App';


function SearchBox() {

  const {searchtext, setSearchtext} = useContext(SearchContext);

  const handleChange = (event) => {
    setSearchtext(event.target.value)

  }
  const handleSearch = () => {
    console.log(searchtext);
  }

  return (
    <div className='searchbox-wrapper'>
      <input type='text' placeholder='検索' onChange={handleChange}/>
      <span onClick={handleSearch} style={{ cursor: "pointer" }}><SearchIcon /></span>
    </div>
  );
}

export default SearchBox;
