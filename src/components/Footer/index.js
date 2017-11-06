import React from 'react';
import s from './styles.css';

function Footer(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <img src='images/logotext.png' className={s.logo} />
        <a href='mailto:connect@lmnop.co' className={s.link}>Investors</a>
        <a href='mailto:connect@lmnop.co' className={s.link}>Partners</a>
        <a href='https://github.com/lmnop' className={s.link}>Developers</a>
      </div>
    </div>
  );
}

export default Footer;

