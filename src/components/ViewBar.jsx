import React from 'react';
import './View.css';
import { useContext } from 'react';
import { ViewContext } from './View';
import { LanguageContext } from '../App';

function ViewBar() {

  const {viewstate, setViewstate} = useContext(ViewContext);
  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');

  return (
    <div class="tab">
      <button class="tablinks" onClick={() => setViewstate('get_popular_project')}>{dic_data.project[currentlang]}</button>
      <button class="tablinks" onClick={() => setViewstate('get_own_project')}>{dic_data.studio[currentlang]}</button>
      <button class="tablinks" onClick={() => setViewstate('get_popular_sprite')}>{dic_data.sprite[currentlang]}</button>
      <button class="tablinks" onClick={() => setViewstate('get_own_sprite')}>{dic_data.studio[currentlang]}</button>
    </div>
  );
}

export default ViewBar;
