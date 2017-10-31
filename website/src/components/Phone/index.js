import React from 'react';
import s from './styles.css';

import IconRow from '../IconRow';

function Phone(props) {
  const iconRow = [
    { src: 'images/wifi.png', text: '4G / LTE WI-FI'},
    { src: 'images/nether.png', text: 'Nether OS'},
    { src: 'images/vpn.png', text: 'Built-In VPN'},
    { src: 'images/dapp.png', text: 'Integrated Dapp'},
  ];

  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
          <div className={s.gridText}>
            <div className={s.title}>
              Your phone, your life
            </div>
            <div className={s.subtitle}>
               Nether designed phone decentralizes not just your data but your life.
            </div>
          </div>
        </div>
        <div className={s.gridRight}>
          <div className={s.rightTitle}>
            Nether Phone
          </div>
        </div>
      </div>
      <IconRow data={iconRow} />
    </div>
  );
}

export default Phone;
