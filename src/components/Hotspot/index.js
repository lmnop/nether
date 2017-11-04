import React from 'react';
import s from './styles.css';

import IconRow from '../IconRow';

function Hotspot(props) {
  const iconRow = [
    { src: 'images/wifi.png', text: '4G / LTE WI-FI'},
    { src: 'images/connect.png', text: 'Connect up to 5 devices'},
    { src: 'images/water.png', text: 'Water Resistant'},
    { src: 'images/dapp.png', text: 'Integrated Dapp'},
  ];

  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
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
      <IconRow data={iconRow} />
    </div>
  );
}

export default Hotspot;
