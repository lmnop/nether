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
      error: '',
    };
  }

  componentWillMount() {
    this.props.getContract();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
    });
  }

  checkMnemonic(mnemonic) {
    if (mnemonic.trim().split(/\s+/g).length >= 12) {
      if (bip39.validateMnemonic(mnemonic)) {
        //this.props.useWallet(mnemonic);

        this.setState({
          error: '',
        });
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
              marginLeft: 300,
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
            <div
              className={s.button}
              onClick={() => {
                this.checkMnemonic(this.state.mnemonic);
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
    user: state.user,
    loading: state.app.loading,
    error: state.app.error,
  };
};

const bindActions = dispatch => ({
  getContract: () => dispatch(userActions.getContract()),
});

export default connect(bindStore, bindActions)(UnlockPage);
