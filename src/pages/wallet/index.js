import React, { Component } from 'react';
import { connect } from 'react-redux';

import Subheader from 'material-ui/Subheader';

import history from '../../history';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

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
      this.props.unlockAccount(this.props.mnemonic, this.props.email);
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
            <div className={s.text}>
              {this.props.email}
            </div>
            <Subheader
              style={{
                color: "#FFFFFF",
              }}
            >
              Public Key
            </Subheader>
            <a
              href={`https://etherscan.io/address/${this.props.address}`}
              target="_blank"
              className={s.address}
            >
              {this.props.address}
            </a>
            <Subheader
              style={{
                color: "#FFFFFF",
              }}
            >
              Ethereum Balance
            </Subheader>
            <div className={s.text}>
              Ξ {this.props.balanceEth}
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
          <Sidebar page="wallet" />
        </div>
      </Layout>
    );
  }
}

const bindStore = (state) => {
  return {
    mnemonic: state.user.mnemonic,
    showLogin: !state.user.mnemonic,
    email: state.user.email,
    address: state.user.address,
    balanceEth: state.user.balanceEth,
    loading: state.app.loading,
    error: state.app.error,
  };
};

const bindActions = dispatch => ({
  unlockAccount: (mnemonic, email) => dispatch(userActions.unlockAccount(mnemonic, email)),
  resetApp: () => dispatch(userActions.resetApp()),
});

export default connect(bindStore, bindActions)(WalletPage);
