import React from 'react';
import s from './styles.css';

function DataPlan(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
          <div className={s.gridText}>
            <div className={s.title}>
              {props.content.title}
            </div>
            <div className={s.subtitle}>
               {props.content.text}
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
