import React from 'react';

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

import s from './desktop.css';

function Desktop(props) {
  return (
    <div className={s.container}>
      <Header />
      <Grid />
      <Privacy />
      <DataPlan />
      <ProductEcosystem />
      <Hotspot />
      <Router />
      <Phone />
      <Outreach />
    </div>
  );
}

export default Desktop;
