import React from 'react';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';

import Link from '../Link';
import Button from '../Button';

import s from './styles.css';

const renderLogin = (props) => {
  return (
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
  );
}

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
        <Button
          onClick={props.onClickOrder}
          text="Order Alpha"
        />
      </div>
    </div>
  );
}

export default Header;
