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

function HeadBar() {


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
    window.location.href = process.env.REACT_APP_CLIENT_URL;

  }

  const onFileChange = async (e) => {
    
    const url = `${process.env.REACT_APP_SERVER_URL}/upload`;
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
      alert('アップロードが成功しました。');
    }
    else {
      alert('アップロードが失敗しました。');
    }
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
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
      <p>自分の部品</p>
      <p onClick={gotoServer} className="signup-btn">作ろう</p>
      <p>見る</p>
      <SearchBox />
      <LangChoice />
      <p  className="signup-btn"　 onClick={handleLogout}>サインアウト</p>
      <p style={{ marginRight : "100px" }}>{username}</p>
    </div>
  );
}

export default HeadBar;
