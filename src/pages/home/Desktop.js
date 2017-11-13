import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Grid from './Grid';
import Privacy from './Privacy';
import DataPlan from './DataPlan';
import ProductEcosystem from './ProductEcosystem';
import Hotspot from './Hotspot';
import Router from './Router';
import Phone from './Phone';
import Outreach from './Outreach';

import content from './content';

import s from './desktop.css';

class Desktop extends Component {
  render() {
    return (
      <div className={s.container}>
        <Header />
        <Grid content={content.grid} />
        <Privacy content={content.privacy} />
        <DataPlan content={content.plan} />
        <ProductEcosystem content={content.products} />
        <Hotspot content={content.spot} />
        <Router content={content.router} />
        <Phone content={content.phone} />
        <Outreach />
        <Footer />
      </div>
    );
  }
}

const bindStore = (state) => {
  return {
    showLogin: !state.user.mnemonic,
  };
};

export default connect(bindStore)(Desktop);
