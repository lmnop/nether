import React, { Component } from 'react';
import { connect } from 'react-redux';
import bip39 from 'bip39';

import history from '../../history';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import * as userActions from '../../actions/user';

import s from './styles.css';

class UnlockPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      mnemonic: '',
      email: '',
      error: '',
    };
  }

  componentWillMount() {
    if (!this.props.showLogin) {
      history.push('wallet');
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

  checkMnemonic() {
    this.setState({
      error: '',
    });

    const mnemonic = this.state.mnemonic;

    if (mnemonic.trim().split(/\s+/g).length >= 12) {
      if (bip39.validateMnemonic(mnemonic)) {
        this.props.unlockAccount(mnemonic, this.state.email);
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
            <div
              className={s.button}
              onClick={() => {
                if (!this.props.loading) {
                  this.checkMnemonic();
                }
              }}
            >
              Unlock Account
            </div>
          </div>
          <Sidebar page="unlock" />
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
  unlockAccount: (mnemonic, email) => dispatch(userActions.unlockAccount(mnemonic, email)),
});

export default connect(bindStore, bindActions)(UnlockPage);
