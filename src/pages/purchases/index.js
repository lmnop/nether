import React, { Component } from 'react';
import { connect } from 'react-redux';
import bip39 from 'bip39';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import Receipt from 'material-ui/svg-icons/action/receipt';
import Devices from 'material-ui/svg-icons/device/devices';
import DataUsage from 'material-ui/svg-icons/device/data-usage';
import AutoRenew from 'material-ui/svg-icons/action/autorenew';

import history from '../../history';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Link from '../../components/Link';

import * as userActions from '../../actions/user';

import s from './styles.css';

class PurchasesPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    if (this.props.showLogin) {
      history.push('unlock');
    } else {
      this.props.unlockAccount(this.props.user.mnemonic, this.props.user.email);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showLogin && nextProps.showLogin) {
      history.push('unlock');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
    });
  }

  render() {
    console.log(this.props.user);

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
              Device<br/>Manager
            </div>
            <Table
              selectable={false}
              wrapperStyle={{
                marginBottom: 40,
              }}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn style={{ width: 20 }}>
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ width: 100 }}>
                    Device
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ width: 60 }}>
                    Ether
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ minWidth: 310 }}>
                    Transaction TX
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                <TableRow>
                  <TableRowColumn style={{ width: 20 }}>
                    <AutoRenew color="#FFFFFF" />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: 100 }}>
                    Nether Alpha
                  </TableRowColumn>
                  <TableRowColumn style={{ width: 60 }}>
                    0.3
                  </TableRowColumn>
                  <TableRowColumn style={{ minWidth: 310 }}>
                    <a href={`https://etherscan.io/tx/${123}`} target="_blank">
                      0x87c694e72682a032c16cc60333dbdb22c8f8a932058cddd3f3dce08f953fa873
                    </a>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            <Table
              selectable={false}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn style={{ width: 20 }}>
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ width: 60 }}>
                    Data
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ width: 60 }}>
                    Ether/GB
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ width: 60 }}>
                    Total Ether
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ minWidth: 310 }}>
                    Transaction TX
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                <TableRow>
                  <TableRowColumn style={{ width: 20 }}>
                    <AutoRenew color="#FFFFFF" />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: 60 }}>
                    10 GB
                  </TableRowColumn>
                  <TableRowColumn style={{ width: 60 }}>
                    0.03
                  </TableRowColumn>
                  <TableRowColumn style={{ width: 60 }}>
                    0.3
                  </TableRowColumn>
                  <TableRowColumn style={{ minWidth: 310 }}>
                    <a href={`https://etherscan.io/tx/${123}`} target="_blank">
                      0x87c694e72682a032c16cc60333dbdb22c8f8a932058cddd3f3dce08f953fa873
                    </a>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Drawer
            open={true}
            containerStyle={{
              backgroundColor: '#8700D1',
              paddingTop: 120,
              width: 280,
            }}
          >
            <Menu>
              <Link to="/wallet">
                <MenuItem
                  primaryText="Wallet"
                  leftIcon={<AccountBalanceWallet color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.5,
                  }}
                />
              </Link>
              <Link to="/purchases">
                <MenuItem
                  primaryText="Purchases"
                  leftIcon={<Receipt color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                  }}
                />
              </Link>
              <Link to="/devices">
                <MenuItem
                  primaryText="Devices (Soon)"
                  leftIcon={<Devices color="#FFFFFF" />}
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.5,
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
                    opacity: 0.5,
                  }}
                  disabled
                />
              </Link>
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
                    opacity: 0.8,
                  }}
                />
              </Link>
              <MenuItem
                primaryText="Spot (Soon)"
                style={{
                  color: "#FFFFFF",
                  opacity: 0.5,
                }}
                disabled
              />
            </Menu>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

const bindStore = (state) => {
  return {
    showLogin: !state.user.mnemonic,
    user: state.user,
    loading: state.app.loading,
    error: state.app.error,
  };
};

const bindActions = dispatch => ({
  unlockAccount: (mnemonic, email) => dispatch(userActions.unlockAccount(mnemonic, email)),
  resetApp: () => dispatch(userActions.resetApp()),
});

export default connect(bindStore, bindActions)(PurchasesPage);
