import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Grid from '../../components/Grid';
import Privacy from '../../components/Privacy';
import DataPlan from '../../components/DataPlan';
import ProductEcosystem from '../../components/ProductEcosystem';
import Hotspot from '../../components/Hotspot';
import Router from '../../components/Router';
import Phone from '../../components/Phone';
import Outreach from '../../components/Outreach';
import Footer from '../../components/Footer';
import Popup from '../../components/Popup';

import s from './desktop.css';

class Desktop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOrder: false,
      showManager: false,
    };
  }

  onClickOrder() {
    this.setState({
      showOrder: !this.state.showOrder,
    });
  }

  render() {
    return (
      <div className={s.container}>
        <Header
          showLogin={!this.props.user.email}
          onClickOrder={this.onClickOrder.bind(this)}
        />
        <Grid />
        <Privacy />
        <DataPlan />
        <ProductEcosystem />
        <Hotspot />
        <Router />
        <Phone />
        <Outreach />
        <Footer />
        <Popup
          isModalOpen={this.state.showOrder}
          onClick={this.onClickOrder.bind(this)}
        />
      </div>
    );
  }
}

const bindStore = (state) => {
  return {
    user: state.user,
  };
};

const bindActions = dispatch => ({

});

export default connect(bindStore, bindActions)(Desktop);
