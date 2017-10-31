import React from 'react';
import s from './styles.css';

function ProductEcosystem(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
          <img src='/images/spot.png' className={s.image}/>
          <div className={s.gridText}>
            <div className={s.title}>
              Portable Privacy
            </div>
            <div className={s.subtitle}>
               Nether Designed Mobile Hotspot built for getting you off the grid even when you’re on it.
            </div>
          </div>
        </div>
        <div className={s.gridRight}>
          <div className={s.rightTitle}>
            Nether Spot
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEcosystem;
