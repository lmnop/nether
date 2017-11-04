import React from 'react';
import s from './styles.css';

function Grid(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
        <div className={s.gridText}>
            <div className={s.title}>
              Get off the grid
            </div>
            <div className={s.subtitle}>
              The future of blockchain is almost here. Order Alpha to get started.
            </div>
            <div onClick={props.onClick} className={s.borderLink}>
              Order Alpha
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;