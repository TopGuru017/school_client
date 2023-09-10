import React from 'react';
import './FootBar.css';
import { useContext,useState } from 'react';
import { LanguageContext } from '../App';
import TextModal from "../components/TextModal";

function FootBar() {

  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
  const gotoContact = () => {
    window.location.href = 'https://www.aisleschool.co.jp/contact.html';
  }
  const [showmodal, setShowmodal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  function handleInfo (title, text) {
    setShowmodal(true);
    setTitle(title);
    setText(text);
  }

  return (
    <>
    <div className='footbar-wrapper'>
      <div className='footbar-container'>
      <div className='footer-container'>
        <div className='foot-text' onClick={() => handleInfo(dic_data.title_scratch_library[currentlang], dic_data.text_scratch_library[currentlang])}>{dic_data.scratch_lib[currentlang]}</div>
        <div className='foot-text'>{dic_data.donor[currentlang]}</div>
        <div className='foot-text'>{dic_data.utilize[currentlang]}</div>
      </div>
      <div className='footer-container'>
        <div className='foot-text'>{dic_data.parent[currentlang]}</div>
        <div className='foot-text' style={{ marginLeft : "180px" }}>{dic_data.donate[currentlang]}</div>
        <div className='foot-text' onClick={() => handleInfo(dic_data.title_privacy[currentlang], dic_data.text_privacy[currentlang])}>{dic_data.privacy[currentlang]}</div>
      </div>
      <div className='footer-container'>
        <div className='foot-text'>{dic_data.education[currentlang]}</div>
        <div className='foot-text' style={{ marginLeft : "80px" }} onClick={gotoContact}>{dic_data.recruit[currentlang]}</div>
        <div className='foot-text'>{dic_data.contact[currentlang]}</div>
      </div>
      </div>
      <div style={{ marginTop: "50px" }}>&copy; Copyright 2023. Aisleschool Corp. All Rights Reserved</div>
    </div>
    <div>
        <TextModal
          show={showmodal}
          onHide={() => setShowmodal(false)}
          title = {title}
          text = {text}
        />
    </div>
    </>
  );
}

export default FootBar;
