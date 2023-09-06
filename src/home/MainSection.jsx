import React from 'react';
import PopularProject from '../components/PopularProject';
import PopularSprite from '../components/PopularSprite';
import OwnProject from '../components/OwnProject';
import OwnSprite from '../components/OwnSprite';


function MainSection() {
  return (
    <div>
      <OwnProject />
      <OwnSprite />
      <PopularProject />
      <PopularSprite />
    </div>
  );
}

export default MainSection;
