import React from 'react';
import './Factors.css';

function Factor({name, path, imgUrl, userid, onClick}) {
  return (
    <div className='factor' onClick={onClick}>
      <img src = {`/api/${imgUrl}`} alt = {name} style={{ marginTop:"20px" }} />
      <p>{name}</p>
    </div>
  );
}

export default Factor;
