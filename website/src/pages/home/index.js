import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Layout';

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

  render() {
    return (
      <Layout>
        <div>Hello World</div>
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
