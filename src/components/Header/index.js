import React from 'react';
import { connect } from 'react-redux';

import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';

import Link from '../Link';

import s from './styles.css';

function Header(props) {
  let Icon = AccountBalanceWallet;

  if (props.showLogin) {
    Icon = LockOutline;
  }

  return (
    <div className={s.container}>
      <div className={s.left}>
        <Link to="/">
          <div className={`${s.logo} ${props.sidebar ? s.sidebar : ''}`}>
            <img src="images/logo.png" className={props.loading ? s.loading : ''} />
          </div>
        </Link>
      </div>
      <div className={s.right}>
        <Link to={props.showLogin ? '/unlock' : '/wallet'}>
          <div className={s.simpleLink}>
            {props.showLogin ? 'Unlock Account' : 'Device Manager'}
            <Icon
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
        <Link to="/alpha">
          <div className={s.button}>
            Order Alpha
          </div>
        </Link>
      </div>
    </div>
  );
}

const bindStore = (state) => {
  return {
    showLogin: !state.user.mnemonic,
    loading: state.app.loading,
  };
};

export default connect(bindStore)(Header);
