import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';

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
      isModalOpen: false,
    };
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <div className={s.container}>
        <Header onClick={this.toggleModal.bind(this)} />
        <Grid onClick={this.toggleModal.bind(this)} />
        <Privacy />
        <DataPlan />
        <ProductEcosystem />
        <Hotspot />
        <Router />
        <Phone />
        <Outreach />
        <Footer />
        <Popup
          isModalOpen={this.state.isModalOpen}
          onClick={this.toggleModal.bind(this)}
        />
      </div>
    );
  }
}

export default Desktop;
