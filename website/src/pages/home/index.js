import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Layout';
import Mobile from './Mobile';
import Desktop from './Desktop';

import * as userActions from '../../actions/user';

class HomePage extends Component {

  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
    });
  }

  renderMobile() {
    return (
      <Mobile />
    );
  }

  renderDesktop() {
    return (
      <Desktop />
    );
  }

  // render() {
  //   return (
  //     <Layout>
  //       {this.state.width >= 640 ? this.renderDesktop() : this.renderMobile()}
  //     </Layout>
  //   );

  render() {
    return (
      <Layout>
        {this.renderMobile()}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const bindActions = dispatch => ({

});

export default connect(mapStateToProps, bindActions)(HomePage);
