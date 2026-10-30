/*
 * Оболочка страницы отдельного памятника. useParams читает id из адреса /monument/:id.
 * Загрузка и содержимое карточки находятся в MonumentDetailsCenter, куда передаётся этот id.
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import MonumentDetailsCenter from '../components/MonumentDetailsCenter';


const MonumentDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
    <div className='monument-details-page'> 
        
        <div className="monument-details-center-col">
          <MonumentDetailsCenter id={id} />
        </div>
        {/* <div className='monument-details-left-col'>
            <MonumentDetailsLeft />
        </div>
        <div className='monument-details-right-col'>
          <MonumentDetailsRight />
        </div> */}
    </div>
    </>
  );
};

export default MonumentDetailsPage;