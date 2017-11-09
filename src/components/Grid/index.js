import React from 'react';
import s from './styles.css';

function Grid(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <video
          className={s.video}
          src="./images/grid.mp4"
          autoPlay
        />
        <div className={s.gridText}>
          <div className={s.title}>
            {props.content.title}
          </div>
          <div className={s.subtitle}>
            {props.content.text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;
