import React from "react";
import { useState } from "react";
import "./ChoiceBar.css";
import TextModal from "../components/TextModal";
import { useContext } from "react";
import { LanguageContext } from "../App";

function ChoiceBar() {

  const {currentlang, setCurrentlang} = useContext(LanguageContext);
  let dic_data = require('../assets/dictionary.json');
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
      <div className="choicebar-wrapper">
        <button onClick={() => handleInfo(dic_data.title_scratch_library[currentlang], dic_data.text_scratch_library[currentlang])}>
          <p>{dic_data.scratch_lib[currentlang]}</p>
        </button>
        <button onClick={() => handleInfo(dic_data.title_scratch_about[currentlang], dic_data.text_scratch_about[currentlang])}>
          <p>{dic_data.scratch_about[currentlang]}</p>
        </button>
        <button>
          <p>{dic_data.parent[currentlang]}</p>
        </button>
        <button>
          <p>{dic_data.education[currentlang]}</p>
        </button>
        <button>
          <p>{dic_data.donate[currentlang]}</p>
        </button>
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

export default ChoiceBar;
