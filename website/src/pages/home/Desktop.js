import React from 'react';

import IconButton from 'material-ui/IconButton';

import Header from '../../components/Header';
import Grid from '../../components/Grid';
import ProductEcosystem from '../../components/ProductEcosystem';
import Hotspot from '../../components/Hotspot';

import s from './desktop.css';

function Desktop(props) {
  return (
    <div className={s.container}>
      <Header />
      <Grid />
      <ProductEcosystem />
      <Hotspot />
    </div>
  );
}

export default Desktop;
