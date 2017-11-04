import React from 'react';
import s from './styles.css';

function DataPlan(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
          <div className={s.gridText}>
            <div className={s.title}>
              A universal data plan
            </div>
            <div className={s.subtitle}>
               The first hardware powered by the Mobile Data Byte Token.
               MDB Token will be a universal token for mobile data
               enabling anyone to access the LMNOP Network.
            </div>
          </div>
        </div>
        <div className={s.gridRight}>
          <img src='/images/mdb.png' className={s.image} />
        </div>
      </div>
    </div>
  );
}

export default DataPlan;
