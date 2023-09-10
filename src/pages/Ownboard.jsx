import React from 'react';
import HeadBar from '../home/HeadBar';
import Banner from '../home/Banner';
import ChoiceBar from '../home/ChoiceBar';
import FootBar from '../home/FootBar';
import OwnProject from '../components/OwnProject';
import OwnSprite from '../components/OwnSprite';

function Ownboard() {
  return (
    <div>
        <HeadBar />
        <Banner />
        <ChoiceBar />
        <OwnProject />
        <OwnSprite />
        <FootBar />
    </div>
  );
}

export default Ownboard;
