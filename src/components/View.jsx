import React from 'react';
import { createContext,useState } from 'react';
import ViewBar from './ViewBar';
import ViewMain from './ViewMain';
import HeadBar from '../home/HeadBar';
import Banner from '../home/Banner';
import FootBar from '../home/FootBar';

export const ViewContext = createContext()

function View() {

  const[viewstate, setViewstate] = useState('get_popular_project');


  return (
    <ViewContext.Provider value={{ viewstate, setViewstate }}>
    <div className='view-wrapper'>
      <HeadBar />
      <Banner />
      <ViewMain />
      <FootBar />
    </div>
    </ViewContext.Provider>
  );
}

export default View;
