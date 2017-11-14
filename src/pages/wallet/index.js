import React, { Component } from 'react';
import { connect } from 'react-redux';
import bip39 from 'bip39';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import Receipt from 'material-ui/svg-icons/action/receipt';
import Devices from 'material-ui/svg-icons/device/devices';
import DataUsage from 'material-ui/svg-icons/device/data-usage';

import history from '../../history';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Link from '../../components/Link';

import * as userActions from '../../actions/user';

import s from './styles.css';

class WalletPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    if (this.props.showLogin) {
      history.push('unlock');
    } else {
      this.props.unlockAccount(this.props.user.mnemonic, this.props.user.email);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showLogin && nextProps.showLogin) {
      history.push('unlock');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
    });
  }

  render() {
    console.log(this.props.user);

    return (
      <Layout>
        <div className={s.container}>
          <Header />
          <div
            className={s.body}
            style={{
              marginLeft: 310,
            }}
          >
            <div className={s.title}>
              Device<br/>Manager
            </div>
            <Subheader
              style={{
                color: "#FFFFFF",
              }}
            >
              Email
            </Subheader>
            <div className={s.address}>
              {this.props.user.email}
            </div>
            <Subheader
              style={{
                color: "#FFFFFF",
              }}
            >
              Public Key
            </Subheader>
            <div className={s.address}>
              {this.props.user.address}
            </div>
            <Subheader
              style={{
                color: "#FFFFFF",
              }}
            >
              Ethereum Balance
            </Subheader>
            <div className={s.address}>
              Ξ {this.props.user.balanceEth}
            </div>
            <div
              className={s.button}
              onClick={() => {
                this.props.resetApp();
              }}
            >
              Lock Account
            </div>
          </div>
          <Drawer
            open={true}
            containerStyle={{
              backgroundColor: '#8700D1',
              paddingTop: 120,
              width: 280,
            }}
          >
            <Menu>
              <Link to="/wallet">
                <MenuItem
                  primaryText="My Wallet"
                  leftIcon={<AccountBalanceWallet color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                  }}
                />
              </Link>
              <Link to="/purchases">
                <MenuItem
                  primaryText="Purchases"
                  leftIcon={<Receipt color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.5,
                  }}
                />
              </Link>
              <Link to="/devices">
                <MenuItem
                  primaryText="Registered Devices"
                  leftIcon={<Devices color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.5,
                  }}
                />
              </Link>
              <Link to="/usage">
                <MenuItem
                  primaryText="Data Usage"
                  leftIcon={<DataUsage color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.5,
                  }}
                />
              </Link>
              <Divider />
              <Subheader
                style={{
                  color: "#FFFFFF",
                }}
              >
                Devices
              </Subheader>
              <Link to="/alpha">
                <MenuItem
                  primaryText="Alpha (Order)"
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.8,
                  }}
                />
              </Link>
              <MenuItem
                primaryText="Spot (Comming Soon)"
                style={{
                  color: "#FFFFFF",
                  opacity: 0.5,
                }}
                disabled
              />
            </Menu>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

const bindStore = (state) => {
  return {
    showLogin: !state.user.mnemonic,
    user: state.user,
    loading: state.app.loading,
    error: state.app.error,
  };
};

const bindActions = dispatch => ({
  unlockAccount: (mnemonic, email) => dispatch(userActions.unlockAccount(mnemonic, email)),
  resetApp: () => dispatch(userActions.resetApp()),
});

export default connect(bindStore, bindActions)(WalletPage);
