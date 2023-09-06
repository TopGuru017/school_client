import React from 'react';
import { useState, useContext, createContext } from 'react';
import OwnFactor from './OwnFactor';
import './Factors.css';
import EditModal from './EditModal';

export const UserContext = createContext();

function OwnFactors({factors}) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const factorsPerPage = 5;
  const [modalShow, setModalShow] = useState(false);
  const [userinfo, setUserinfo] = useState({});
  const handleFactorClick = (factor) => {
    console.log('Factor Clicked', factor)
  }
  const handlePreviousPage = () => {
    if(currentPageIndex > 0) {
      setCurrentPageIndex((currentPageIndex) => currentPageIndex - 1);
    }
  };
  const handleNextPage = () => {
    if(currentPageIndex < Math.floor(factors.length / factorsPerPage)){
      console.log(factors.length / factorsPerPage)
      setCurrentPageIndex((currentPageIndex) => currentPageIndex + 1);
    }
  };

  const startIndex = currentPageIndex * factorsPerPage;
  const endIndex = startIndex + factorsPerPage;
  const factorsToDisplay = factors.slice(startIndex, endIndex);

  return (
    <>
      <div style={{display:'flex'}}>
        <div className='move-button'><button className="page-mov" onClick={handlePreviousPage}>&lt;</button></div>
      <div className='factors-grid'>
        {
          factorsToDisplay.map((factor, index) => (
              <OwnFactor
                key = {index}
                name = {factor.name}
                path = {factor.path}
                imgUrl = {factor.icon}
                userid = {factor.userid}
                onClick = {() => {setModalShow(true); setUserinfo(factor)}}
              />
          ))
        }
      </div>
      <div className='move-button'><button className="page-mov" onClick={handleNextPage}>&gt;</button></div>
      </div>
      <div>
        <UserContext.Provider value={userinfo}>
          <EditModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </UserContext.Provider>
      </div>
    </>
  );
}

export default OwnFactors;
