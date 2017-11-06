import React from 'react';
import s from './styles.css';

import IconRow from '../IconRow';

function Privacy(props) {
  const iconRow = [
    { src: 'images/identity.png', text: 'Anonymous Identity'},
    { src: 'images/security.png', text: 'Security Encryption'},
    { src: 'images/access.png', text: 'Global Access'},
    { src: 'images/mobility.png', text: 'Mobility Enabled'},
  ];

  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.title}>
          {props.content.title}
        </div>
        <IconRow data={iconRow} />
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
