import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import AutoRenew from 'material-ui/svg-icons/action/autorenew';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

import history from '../../history';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

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
      this.props.unlockAccount(this.props.mnemonic, this.props.email);
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

  renderDevicePurchaseEmpty() {
    if (_.isEmpty(this.props.purchasesPending) && _.isEmpty(this.props.purchaseContract.purchases)) {
      return (
        <TableRow>
          <TableRowColumn style={{ width: 100 }}>
            No Device Purchases Completed
          </TableRowColumn>
        </TableRow>
      );
    }
  }

  renderDevicePurchasePending() {
    return _.map(this.props.purchasesPending, (pending, i) => {
      return (
        <TableRow key={pending.hash}>
          <TableRowColumn style={{ width: 20 }}>
            <AutoRenew color="#FFFFFF" />
          </TableRowColumn>
          <TableRowColumn style={{ width: 100 }}>
            Nether Alpha
          </TableRowColumn>
          <TableRowColumn style={{ width: 60 }}>
            {pending.valueEth}
          </TableRowColumn>
          <TableRowColumn style={{ minWidth: 310 }}>
            <a href={`https://etherscan.io/tx/${pending.hash}`} target="_blank">
              {pending.hash}
            </a>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  renderDevicePurchase() {
    return _.map(this.props.purchaseContract.purchases, (purchase, i) => {
      return (
        <TableRow key={purchase.hash}>
          <TableRowColumn style={{ width: 20 }}>
            <CheckCircle color="#FFFFFF" />
          </TableRowColumn>
          <TableRowColumn style={{ width: 100 }}>
            Nether Alpha
          </TableRowColumn>
          <TableRowColumn style={{ width: 60 }}>
            {purchase.valueEth}
          </TableRowColumn>
          <TableRowColumn style={{ minWidth: 310 }}>
            <a href={`https://etherscan.io/tx/${purchase.hash}`} target="_blank">
              {purchase.hash}
            </a>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Layout>
        <div className={s.container}>
          <Header sidebar />
          <div
            className={s.body}
            style={{
              transition: 'all 600ms ease',
              marginLeft: this.props.open ? 310 : 150,
            }}
          >
            <div className={s.title}>
              Device Manager
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
                {this.renderDevicePurchaseEmpty()}
                {this.renderDevicePurchasePending()}
                {this.renderDevicePurchase()}
              </TableBody>
            </Table>
            <Table
              selectable={false}
              bodyStyle={{
                marginBottom: 80,
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
                  <TableRowColumn style={{ width: 100 }}>
                    No Data Purchases Completed
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Sidebar page="purchases" />
        </div>
      </Layout>
    );
  }
}

const bindStore = (state) => {
  return {
    mnemonic: state.user.mnemonic,
    email: state.user.email,
    showLogin: !state.user.mnemonic,
    purchasesPending: state.user.purchasesPending,
    purchaseContract: state.user.purchaseContract,
    loading: state.app.loading,
    error: state.app.error,
    open: state.app.open,
  };
};

const bindActions = dispatch => ({
  unlockAccount: (mnemonic, email) => dispatch(userActions.unlockAccount(mnemonic, email)),
  resetApp: () => dispatch(userActions.resetApp()),
});

export default connect(bindStore, bindActions)(PurchasesPage);
