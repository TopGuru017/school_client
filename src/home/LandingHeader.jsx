import React from "react";
import SchoolIcon from "../assets/icons/school_icon.svg";
import MarkIcon from "../assets/icons/mark_icon.svg";
import ScratchIcon from "../assets/icons/scratch_icon.svg";
import SearchBox from "../components/SearchBox";
import LangChoice from "../components/LangChoice";
import "./HeadBar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../App";

function LandingHeader() {

  const {currentlang, setCurrenlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');

  const gotoServer = () => {
    console.log("yes");
    window.location.href = "http://localhost:8601";
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
      <p onClick={gotoServer} className="signup-btn">{dic_data.make[currentlang]}</p>
      <p>{dic_data.view[currentlang]}</p>
      <SearchBox />
      <LangChoice />
      <NavLink to="/login"><p  className="signup-btn">{dic_data.signin[currentlang]}</p></NavLink>
      <NavLink to="/register"><p style={{ marginRight: "40px" }}  className="signup-btn" >{dic_data.signup[currentlang]}</p></NavLink>
    </div>
  );
}

export default LandingHeader;
