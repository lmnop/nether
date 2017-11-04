import React from 'react';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';

import Link from '../Link';

import s from './styles.css';

function Header(props) {
  return (
    <div className={s.container}>
      <div className={s.left}>
        <Link to="/">
          <div className={s.logo}>
            <img src="images/logo.png" className={s.image} />
          </div>
        </Link>
      </div>
      <div className={s.right}>
        <Link to={props.showLogin ? '/unlock' : '/manager'}>
          <div className={s.simpleLink}>
            {props.showLogin ? 'Unlock Account' : 'My Manager'}
            <LockOutline
              color="#00F9B8"
              style={{
                width: '18px',
                height: '18px',
                marginLeft: '4px',
                marginBottom: '4px',
              }}
            />
          </div>
        </Link>
        <div
          className={s.borderLink}
          onClick={props.onClickOrder}
        >
          Order Alpha
        </div>
      </div>
    </div>
  );
}

export default Header;
