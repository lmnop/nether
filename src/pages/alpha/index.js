import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Link from '../../components/Link';

import * as userActions from '../../actions/user';

import s from './styles.css';

class AlphaPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      mnemonic: '',
      address: '',
      address2: '',
      country: '',
      city: '',
      postalCode: '',
      ether: 0.0,
      shippingError: '',
      mnemonicError: '',
      ethError: '',
    };
  }

  componentWillMount() {
    if (this.props.showLogin) {
      this.props.getPurchaseAlphaContract();
    } else {
      this.props.unlockAccount(this.props.mnemonic, this.props.email);
    }
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

  renderLock() {
    return (
      <Link to="/create">
        <div className={s.button}>
          Need Account to Purchase
        </div>
      </Link>
    );
  }

  renderUnlock() {
    return (
      <div>
        <div className={s.box}>
          <div className={s.boxHeader}>
            Confirm Account Phrase
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
          {this.renderBoxFooter(this.state.mnemonicError)}
        </div>
        <div className={s.info}>
          We are working to deliver all devices without knowing too much about you.
        </div>
        <div className={s.info}>
          You can provide as much or as little shipping info as you want. We can follow up with you via email to find the best way to deliver the device.
        </div>
        <div className={s.box}>
          <div className={s.boxHeader}>
            Shipping Information (optional)
          </div>
          <div className={s.boxBody}>
            <input
              className={s.input}
              onChange={(event) => {
                this.setState({
                  address: event.target.value,
                });
              }}
              value={this.state.address}
              placeholder="address"
            />
          </div>
          <div className={s.boxBody}>
            <input
              className={s.input}
              onChange={(event) => {
                this.setState({
                  address2: event.target.value,
                });
              }}
              value={this.state.address2}
              placeholder="address 2"
            />
          </div>
          <div className={s.boxBody}>
            <input
              className={s.input}
              onChange={(event) => {
                this.setState({
                  city: event.target.value,
                });
              }}
              value={this.state.city}
              placeholder="city"
            />
          </div>
          <div className={s.boxBody}>
            <input
              className={s.input}
              onChange={(event) => {
                this.setState({
                  country: event.target.value,
                });
              }}
              value={this.state.country}
              placeholder="country"
            />
          </div>
          <div className={s.boxBody}>
            <input
              className={s.input}
              onChange={(event) => {
                this.setState({
                  postalCode: event.target.value,
                });
              }}
              value={this.state.postalCode}
              placeholder="postal code"
            />
          </div>
          {this.renderBoxFooter(this.state.shippingError)}
        </div>
        <div className={s.checkout}>
          <div className={s.checkoutRow}>
            <div className={s.checkoutTitle}>
              Device
            </div>
            <div className={s.checkoutPrice}>
              Ξ {this.props.priceEth}
            </div>
          </div>
          <div className={s.checkoutRow}>
            <div className={s.checkoutTitle}>
              Estimated Gas
            </div>
            <div className={s.checkoutPrice}>
              Ξ {this.props.estimatedGasEth}
            </div>
          </div>
          <div className={s.checkoutRowTotal}>
            <div className={s.checkoutTitleTotal}>
              Total Ether
            </div>
            <div className={s.checkoutPriceTotal}>
              Ξ {parseFloat(this.props.priceEth) + parseFloat(this.props.estimatedGasEth)}
            </div>
          </div>
        </div>
        <div className={s.box}>
          <div className={s.boxHeader}>
            Confirm Total Ether
          </div>
          <div className={s.boxBody}>
            <input
              className={s.input}
              onChange={(event) => {
                this.setState({
                  ether: event.target.value,
                });
              }}
              value={this.state.ether}
            />
          </div>
          {this.renderBoxFooter(this.state.ethError || this.props.error)}
        </div>
        <div
          className={s.button}
          onClick={() => {
            if (this.props.mnemonic === this.state.mnemonic) {
              this.setState({
                mnemonicError: '',
              });

              if (parseFloat(this.state.ether) === parseFloat(this.props.priceEth) + parseFloat(this.props.estimatedGasEth)) {
                this.setState({
                  ethError: '',
                });

                if (!this.props.loading) {
                  this.props.purchaseAlpha(this.state);
                }
              } else {
                this.setState({
                  ethError: 'total ether price does not match',
                });
              }
            } else {
              this.setState({
                mnemonicError: 'mnemonic does not match',
              });
            }
          }}
        >
          Purchase Alpha
        </div>
      </div>
    );
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
              Nether Alpha
            </div>
            <div className={s.price}>
              Ξ {this.props.priceEth}
            </div>
            {this.props.showLogin ? this.renderLock() : this.renderUnlock()}
          </div>
          <Sidebar page="alpha" />
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
    loading: state.app.loading,
    error: state.app.error,
    priceEth: state.contracts.purchase.priceEth,
    estimatedGasEth: state.contracts.purchase.estimatedGasEth,
  };
};

const bindActions = dispatch => ({
  unlockAccount: (mnemonic, email) => dispatch(userActions.unlockAccount(mnemonic, email)),
  getPurchaseAlphaContract: () => dispatch(userActions.getPurchaseAlphaContract()),
  purchaseAlpha: (data) => dispatch(userActions.purchaseAlpha(data)),
});

export default connect(bindStore, bindActions)(AlphaPage);
