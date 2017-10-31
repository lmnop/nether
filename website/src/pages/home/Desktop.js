import React from 'react';

import IconButton from 'material-ui/IconButton';

import Header from '../../components/Header';
import Grid from '../../components/Grid';

import s from './desktop.css';

function Desktop(props) {
  return (
    <div className={s.container}>
      <Header />
      <Grid />
    </div>
  );
}

export default Desktop;
