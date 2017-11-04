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
          The right to privacy exists for all people
        </div>
        <IconRow data={iconRow} />
        <div className={s.subtitle}>
          LMNOP is a next generation mobile data network on the blockchain.
          It is built to give consumers control over their devices, the
          agreements they enter into, and the network itself.
        </div>
        <a href='#' className={s.link}>
          Check out LMNOP
        </a>
      </div>
    </div>
  );
}

export default Privacy;
