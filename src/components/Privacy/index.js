import React from 'react';
import s from './styles.css';

import IconRow from '../IconRow';

function Privacy(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.title}>
          {props.content.title}
        </div>
        <IconRow data={props.content.icons} />
        <div className={s.subtitle}>
          {props.content.text}
        </div>
        <a target="_blank" href='https://lmnop.network' className={s.link}>
          Learn more at L|M|N|O|P
        </a>
      </div>
    </div>
  );
}

export default Privacy;
