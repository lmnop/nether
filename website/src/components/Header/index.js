import React from 'react';

import s from './styles.css';

function Header(props) {
  return (
    <div className={s.container}>
      <div className={s.left}>
        <div className={s.logo}>
          <img src="images/logo.png" className={s.image} />
        </div>
      </div>
      <div className={s.right}>
        <a href="#" className={s.simpleLink}>My Manager</a>
        <a href="#" className={s.borderLink}>Order Alpha</a>
      </div>
    </div>
  );
}

export default Header;
