import React, { useEffect } from "react";
import { useState, useRef } from "react";
import SchoolIcon from "../assets/icons/school_icon.svg";
import MarkIcon from "../assets/icons/mark_icon.svg";
import ScratchIcon from "../assets/icons/scratch_icon.svg";
import SearchBox from "../components/SearchBox";
import LangChoice from "../components/LangChoice";
import "./HeadBar.css";
import DropDown from "../components/DropDown";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { LanguageContext } from "../App";

function HeadBar() {

  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [])
   
  const gotoServer = () => {
    console.log("yes");
    window.location.href = "http://localhost:8601";
  };
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const onButtonClick = () => {
    // Programmatically click the hidden file input
    fileInput.current.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';

  }

  const onFileChange = async (e) => {
    
    const url = '/api/upload';
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
      console.log("SUCESF")
      // const res = await response.json();
      alert(dic_data.alert_upload_success[currentlang]);
    }
    else {
      alert(dic_data.alert_upload_failed[currentlang]);
    }
    window.location.href = '/dashboard';
  };
  return (
    
    <div className="headbar-wrapper">
      <div style={{ padding:"10px" }}>
        <img
          src={SchoolIcon}
          alt=""
          style={{ width: "60px", height: "35px", marginRight:"10px"}} // Adjust width and height as needed
        />
        <img
          src={MarkIcon}
          alt=""
          style={{ width: "40px", height: "35px", marginRight:"10px" }} // Adjust width and height as needed
        />
        <img
          src={ScratchIcon}
          alt=""
          style={{ width: "90px", height: "35px", marginRight:"10px"}} // Adjust width and height as needed
        />
      </div>

      <input type="file" ref={fileInput} onChange={onFileChange} style={{ display: 'none' }} />
      {/* <p  className="signup-btn" onClick={onButtonClick}>アップロード</p> */}
      <DropDown />
      <NavLink to='/own'><p className="signup-btn">{dic_data.own_work[currentlang]}</p></NavLink>
      <p onClick={gotoServer} className="signup-btn">{dic_data.make[currentlang]}</p>
      <NavLink to='/dashboard'><p className="signup-btn">{dic_data.view[currentlang]}</p></NavLink>
      <SearchBox />
      <LangChoice />
      <p  className="signup-btn" onClick={handleLogout}>{dic_data.signout[currentlang]}</p>
      <p style={{ marginRight : "100px" }}>{username}</p>
    </div>
  );
}

export default HeadBar;
