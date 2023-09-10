import React from 'react';
import Factor from './Factor';
import { useState } from 'react';
import './Factors.css';


function Factors({factors}) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const factorsPerPage = 5;

  const handleDownload = (factor) => {
    console.log(factor)
    const url = `/api/${factor.path}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = factor.name;
    a.click();
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
  const endIndex = Math.min(startIndex + factorsPerPage, factors.length);
  const factorsToDisplay = factors.slice(startIndex, endIndex);

  return (
    <>
      <div style={{display:'flex'}}>
        <div className='move-button'><button className="page-mov" onClick={handlePreviousPage}>&lt;</button></div>
        <div className='factors-grid'>
          {
            factorsToDisplay.map((factor, index) => (
              <Factor
                key={index}
                name={factor.name}
                path={factor.path}
                imgUrl={factor.icon}
                userid={factor.userid}
                onClick={() => { handleDownload(factor) }}
              />
            ))
          }
        </div>
        <div className='move-button'><button className="page-mov" onClick={handleNextPage}>&gt;</button></div>
      </div>
    </>
  );
}

export default Factors;
