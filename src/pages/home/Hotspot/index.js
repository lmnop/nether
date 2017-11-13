import React from 'react';
import s from './styles.css';

import IconRow from '../IconRow';

function Hotspot(props) {
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
          <div className={s.rightTitle}>
            Nether Spot
          </div>
        </div>
      </div>
      <IconRow data={props.content.icons} />
    </div>
  );
}

export default Hotspot;
