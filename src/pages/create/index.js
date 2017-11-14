import React, { Component } from 'react';
import { connect } from 'react-redux';
import bip39 from 'bip39';

import history from '../../history';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import * as userActions from '../../actions/user';

import s from './styles.css';

class CreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      mnemonic: '',
      error: '',
      email: '',
    };
  }

  componentWillMount() {
    if (!this.props.showLogin) {
      history.push('wallet');
    } else {
      this.generateMnemonic();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showLogin && !nextProps.showLogin) {
      history.push('wallet');
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

  generateMnemonic() {
    this.setState({
      mnemonic: bip39.generateMnemonic(),
    });
  }

  checkMnemonic() {
    this.setState({
      error: '',
    });

    const mnemonic = this.state.mnemonic;

    if (mnemonic.trim().split(/\s+/g).length >= 12) {
      if (bip39.validateMnemonic(mnemonic)) {
        this.props.createAccount(mnemonic, this.state.email);
      } else {
        this.setState({
          error: 'account phrase is invalid',
        });
      }
    } else {
      this.setState({
        error: 'account phrase must be 12 words',
      });
    }
  }

  renderBoxFooter(text) {
    if (text) {
      return (
        <div className={s.boxFooter}>
          {text}
        </div>
      );
    }

    return <div className={s.blankBoxFooter}/>
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
            <div className={s.info}>
              This is your generated account phrase and is used to unlock your account in the future and handle your private keys for signing transactions.
            </div>
            <div className={s.box}>
              <div className={s.boxHeader}>
                Account Phrase
              </div>
              <div className={s.boxBody}>
                <textarea
                  rows="4"
                  cols="50"
                  className={s.mnemonic}
                  onChange={(event) => {
                    this.setState({
                      mnemonic: event.target.value,
                    });
                  }}
                  value={this.state.mnemonic}
                />
              </div>
              {this.renderBoxFooter(this.state.error)}
            </div>
            <div className={s.info}>
              We do not store/save this information on our servers, and thus can't recover this for you.
            </div>
            <div className={s.info}>
              Please keep this secret and secure.
            </div>
            <div
              className={s.generate}
              onClick={() => {
                this.generateMnemonic();
              }}
            >
              Generate New Phrase
            </div>
            <div className={s.box}>
              <div className={s.boxHeader}>
                Enter Email
              </div>
              <div className={s.boxBody}>
                <input
                  className={s.email}
                  onChange={(event) => {
                    this.setState({
                      email: event.target.value,
                    });
                  }}
                  value={this.state.email}
                />
              </div>
              {this.renderBoxFooter(this.props.error)}
            </div>
            <div className={s.info}>
              Email is used to send notifications and handle any communication specifically tied to your account.
            </div>
            <div className={s.info}>
              We will email you your account phrase for your records.
            </div>
            <div
              className={s.button}
              onClick={() => {
                if (!this.props.loading) {
                  this.checkMnemonic();
                }
              }}
            >
              Create Account
            </div>
          </div>
          <Sidebar page="create" />
        </div>
      </Layout>
    );
  }
}

const bindStore = (state) => {
  return {
    showLogin: !state.user.mnemonic,
    loading: state.app.loading,
    error: state.app.error,
  };
};

const bindActions = dispatch => ({
  createAccount: (mnemonic, email) => dispatch(userActions.createAccount(mnemonic, email)),
});

export default connect(bindStore, bindActions)(CreatePage);
