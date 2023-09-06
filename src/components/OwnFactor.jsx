import React from 'react';
import './Factors.css';



function OwnFactor({name, path, imgUrl, userid, onClick}) {
  return (
    <div className='factor' onClick={onClick}>
      <img src = {`${process.env.REACT_APP_SERVER_URL}/${imgUrl}`} alt = {name} style={{ marginTop:"20px" }} />
      <p>{name}</p>
    </div>
  );
}

export default OwnFactor;
