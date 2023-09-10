import React from 'react';
import './LangChoice.css';
import { useContext } from 'react';
import { LanguageContext } from '../App';

function LangChoice() {

  const {currentlang, setCurrentlang} = useContext(LanguageContext);

  const setLanguage = (event) => {
    setCurrentlang(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div　className='langchoice-wrapper'>
      <select name="mylist" onChange={setLanguage}>
        <option value="jp" >日本語</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

export default LangChoice;
