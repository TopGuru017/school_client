import React, { useState, useRef } from "react";
import axios from "axios";

function DropDown() {
  const [selectedOption, setSelectedOption] = useState("");
  const fileInput = useRef(null);


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    let url;
    if(selectedOption === 'project') url = `${process.env.REACT_APP_SERVER_URL}/upload`;
    else url = `${process.env.REACT_APP_SERVER_URL}/upload_sprite`;
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
    <div className="langchoice-wrapper">
      <input type="file" ref={fileInput} onChange={onFileChange} style={{ display: 'none' }} accept=".sb3, .sprite3"/>
      <select value={selectedOption} onChange={handleChange}>
        <option value="" disabled>アップロード</option>
        <option value="project" >自分のプロジェクト</option>
        <option value="sprite">自分の部品</option>
      </select>
    </div>
  );
}

export default DropDown;
