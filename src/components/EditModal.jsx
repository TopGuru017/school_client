import React, { useState } from 'react';
import { useContext } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {UserContext} from './OwnFactors';
import './Modal.css';

function EditModal(props) {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const userinfo = useContext(UserContext);
  const [editname, setEditname] = useState("");
  const [editText, setEditText] = useState("");
  const handleDownload = async () => {
    const url = `/api/${userinfo.path}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = userinfo.name;
    a.click();
    await sleep(2000);
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
  }
  const handleEdit = async () => {
    const res = await fetch('/api/edit', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({"fileid" : userinfo.id, "filename": editname, "filetext" : editText})
    })
    if(res.status === 200) alert("成功しました。")
    else alert("失敗しました。")
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
  }
  const handleDelete = async () => {
    const res = await fetch('/api/delete', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({"fileid" : userinfo.id})
    });
    if(res.status === 200) alert("削除しました。")
    else alert("失敗しました。")
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
  }
  const handleChange = (event) => {
    setEditname(event.target.value);
  }

  const handleChangeText = (event) => {
    setEditText(event.target.value);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor:"azure" }}>
        <Modal.Title id="contained-modal-title-vcenter">
        <label>ファイルエディタ</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='model-body'>
        <div className='name-editor'>
        <label>新しい名</label>
        <input type='text' placeholder={userinfo.name} name='editvalue' onChange={handleChange}/>
        </div>
        <br/>
        <br/>
        <div className='text-editor'>
        <label>新しい説明</label>
        <input type='text' placeholder={userinfo.description} name='editvalue2' onChange={handleChangeText}/>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor:"azure" }}>
        <button onClick={handleDownload}>ダウンロード</button>
        <button onClick={handleEdit}>変更</button>
        <button onClick={handleDelete}>削除</button>
        <button onClick={props.onHide}>閉じる</button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
