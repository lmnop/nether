import React, { Component } from 'react';
import { connect } from 'react-redux';
import bip39 from 'bip39';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import LockOpen from 'material-ui/svg-icons/action/lock-open';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

import history from '../../history';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Link from '../../components/Link';

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
          <Drawer
            open={true}
            containerStyle={{
              backgroundColor: '#8700D1',
              paddingTop: 120,
              width: 280,
            }}
          >
            <Menu>
              <Link to="/unlock">
                <MenuItem
                  primaryText="Unlock Account"
                  leftIcon={<LockOpen color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                  }}
                />
              </Link>
              <Link to="/create">
                <MenuItem
                  primaryText="Create Account"
                  leftIcon={<PersonAdd color="#FFFFFF" />}
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
                primaryText="Spot (Soon)"
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
});

export default connect(bindStore, bindActions)(UnlockPage);
