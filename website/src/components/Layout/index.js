import React, { Children } from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import s from './styles.css';

const themePreferences = {
  tabs: {
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#fff',
  },
};

function Layout(props) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(themePreferences)}>
      <div className={s.root}>
        {Children.only(props.children)}
      </div>
    </MuiThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
