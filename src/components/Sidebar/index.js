import React from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import LockOpen from 'material-ui/svg-icons/action/lock-open';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import Receipt from 'material-ui/svg-icons/action/receipt';
import Devices from 'material-ui/svg-icons/device/devices';
import DataUsage from 'material-ui/svg-icons/device/data-usage';

import Link from '../Link';

const lock = (props) => {
  return (
    <Menu>
      <Link to="/unlock">
        <MenuItem
          primaryText="Unlock Account"
          leftIcon={<LockOpen color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'unlock' ? 1 : 0.5,
          }}
        />
      </Link>
      <Link to="/create">
        <MenuItem
          primaryText="Create Account"
          leftIcon={<PersonAdd color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'create' ? 1 : 0.5,
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
          primaryText="Wallet"
          leftIcon={<AccountBalanceWallet color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'wallet' ? 1 : 0.5,
          }}
        />
      </Link>
      <Link to="/purchases">
        <MenuItem
          primaryText="Purchases"
          leftIcon={<Receipt color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'purchases' ? 1 : 0.5,
          }}
        />
      </Link>
      <Link to="/devices">
        <MenuItem
          primaryText="Devices (Soon)"
          leftIcon={<Devices color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'devices' ? 1 : 0.5,
          }}
          disabled
        />
      </Link>
      <Link to="/usage">
        <MenuItem
          primaryText="Usage (Soon)"
          leftIcon={<DataUsage color="#FFFFFF" />}
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'usage' ? 1 : 0.5,
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
      open={true}
      containerStyle={{
        backgroundColor: '#8700D1',
        paddingTop: 120,
        width: 280,
      }}
    >
      {props.showLogin ? lock(props) : unlock(props)}
      <Menu>
        <Divider />
        <Subheader
          style={{
            color: "#FFFFFF",
          }}
        >
          Nether Devices
        </Subheader>
        <Link to="/alpha">
          <MenuItem
            primaryText="Alpha (Order)"
            style={{
              color: "#FFFFFF",
              opacity: props.page === 'alpha' ? 1 : 0.8,
            }}
          />
        </Link>
        <MenuItem
          primaryText="Spot (Soon)"
          style={{
            color: "#FFFFFF",
            opacity: props.page === 'spot' ? 1 : 0.5,
          }}
          disabled
        />
      </Menu>
    </Drawer>
  );
}

const bindStore = (state) => {
  return {
    showLogin: !state.user.mnemonic,
  };
};

export default connect(bindStore)(Sidebar);
