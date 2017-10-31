import React from 'react';
import s from './styles.css';

import IconRow from '../IconRow';

function Router(props) {
  const iconRow = [
    { src: 'images/wifi.png', text: '4G / LTE WI-FI'},
    { src: 'images/connect.png', text: 'Connect up to 20 devices'},
    { src: 'images/battery.png', text: 'Battery Reserve'},
    { src: 'images/vpn.png', text: 'Built-In VPN'},
  ];

  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
          <div className={s.rightTitle}>
            Nether Node
          </div>
          
        </div>
        <div className={s.gridRight}>
          <div className={s.gridText}>
            <div className={s.title}>
              Privacy in your Home, Office & Enterprise
            </div>
            <div className={s.subtitle}>
               Nether Designed Stationary Hotspot built for privacy for all
               your devices at home and/or office. Connect Up to 20 devices.
            </div>
          </div>
        </div>
      </div>
      <IconRow data={iconRow} />
    </div>
  );
}

export default Router;
