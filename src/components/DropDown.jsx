import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../App";


function DropDown() {
  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
  const [selectedOption, setSelectedOption] = useState("");
  const fileInput = useRef(null);


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    let url;
    if(selectedOption === 'project') url = '/api/upload';
    else url = '/api/upload_sprite';
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    const response = await axios.post(url, formData, config);
    console.log(response)
    if(response.status === 200){
      alert(dic_data.alert_upload_success[currentlang]);
    }
    else {
      alert(dic_data.alert_upload_failed[currentlang]);
    }
    window.location.href = '/dashboard';
  };

  return (
    <div className="langchoice-wrapper">
      <input type="file" ref={fileInput} onChange={onFileChange} style={{ display: 'none' }} accept=".sb3, .sprite3"/>
      <select value={selectedOption} onChange={handleChange}>
        <option value="" disabled>{dic_data.upload[currentlang]}</option>
        <option value="project" >{dic_data.own_project[currentlang]}</option>
        <option value="sprite">{dic_data.own_sprite[currentlang]}</option>
      </select>
    </div>
  );
}

export default DropDown;
