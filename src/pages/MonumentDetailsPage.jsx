// MonumentDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MonumentDetailsPage.css';
import MonumentDetailsCenter from '../components/MonumentDetailsCenter';
import MonumentDetailsLeft from '../components/MonumentDetailsLeft';
import MonumentDetailsRight from '../components/MonumentDetailsRight';

const MonumentDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
    <div className='monument-details-page'> 
        
        <div className="monument-details-center-col">
          <MonumentDetailsCenter id={id} />
        </div>
        <div className='monument-details-left-col'>
            <MonumentDetailsLeft />
        </div>
        <div className='monument-details-right-col'>
          <MonumentDetailsRight />
        </div>
    </div>
    </>
  );
};

export default MonumentDetailsPage;