import React from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import LockOpen from 'material-ui/svg-icons/action/lock-open';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import Receipt from 'material-ui/svg-icons/action/receipt';
import Devices from 'material-ui/svg-icons/device/devices';
import DataUsage from 'material-ui/svg-icons/device/data-usage';
import ChevronLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRightIcon from 'material-ui/svg-icons/navigation/chevron-right';

import Link from '../Link';

import * as userActions from '../../actions/user';

const lock = (props) => {
  return (
    <Menu>
      <Link to="/unlock">
        <MenuItem
          primaryText={props.open ? 'Unlock Account' : ''}
          leftIcon={<LockOpen color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'unlock' ? 1 : 0.5,
            paddingLeft: 30,
            width: props.open ? 280 : 120,
          }}
        />
      </Link>
      <Link to="/create">
        <MenuItem
          primaryText={props.open ? 'Create Account' : ''}
          leftIcon={<PersonAdd color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'create' ? 1 : 0.5,
            paddingLeft: 30,
            width: props.open ? 280 : 120,
          }}
        />
      </Link>
    </Menu>
  );
}

const unlock = (props) => {
  return (
    <Menu>
      <Link to="/wallet">
        <MenuItem
          primaryText={props.open ? 'Wallet' : ''}
          leftIcon={<AccountBalanceWallet color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'wallet' ? 1 : 0.5,
            paddingLeft: 30,
            width: props.open ? 280 : 120,
          }}
        />
      </Link>
      <Link to="/purchases">
        <MenuItem
          primaryText={props.open ? 'Purchases' : ''}
          leftIcon={<Receipt color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'purchases' ? 1 : 0.5,
            paddingLeft: 30,
            width: props.open ? 280 : 120,
          }}
        />
      </Link>
      <Link to="/devices">
        <MenuItem
          primaryText={props.open ? 'Devices (Soon)' : ''}
          leftIcon={<Devices color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'devices' ? 1 : 0.3,
            marginLeft: 30,
            width: props.open ? 280 : 120,
          }}
          disabled
        />
      </Link>
      <Link to="/usage">
        <MenuItem
          primaryText={props.open ? 'Usage (Soon)' : ''}
          leftIcon={<DataUsage color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'usage' ? 1 : 0.3,
            marginLeft: 30,
            width: props.open ? 280 : 120,
          }}
          disabled
        />
      </Link>
    </Menu>
  );
}

function Sidebar(props) {
  return (
    <Drawer
      open
      containerStyle={{
        backgroundColor: '#8700D1',
        paddingTop: 120,
        width: props.open ? 280 : 120,
        transition: 'all 600ms ease',
      }}
    >
      {props.showLogin ? lock(props) : unlock(props)}
      <Menu>
        <Divider
          style={{
            width: 310,
            opacity: 0.3,
            backgroundColor: '#000',
          }}
        />
        <Subheader
          style={{
            color: "#000",
            opacity: 0.3,
            fontSize: 20,
            paddingLeft: 30,
          }}
        >
          Nether
        </Subheader>
        <Link to="/alpha">
          <MenuItem
            primaryText="Alpha"
            style={{
              color: "#FFFFFF",
              opacity: props.page === 'alpha' ? 1 : 0.8,
              paddingLeft: 30,
            }}
          />
        </Link>
        <MenuItem
          primaryText="Spot"
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'spot' ? 1 : 0.3,
            marginLeft: 30,
          }}
          disabled
        />
      </Menu>
      <List
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingBottom: 0,
        }}
      >
        <ListItem
          style={{
            backgroundColor: '#000',
            height: '48px',
            opacity: 0.3,
            paddingLeft: props.open ? 0 : 30,
          }}
          leftIcon={props.open ? null : <ChevronRightIcon />}
          rightIcon={props.open ? <ChevronLeftIcon /> : null}
          onTouchTap={props.flipSidebar}
        />
      </List>
    </Drawer>
  );
}

const bindStore = (state) => {
  return {
    showLogin: !state.user.mnemonic,
    open: state.app.open,
  };
};

const bindActions = dispatch => ({
  flipSidebar: () => dispatch(userActions.flipSidebar()),
});

export default connect(bindStore, bindActions)(Sidebar);
