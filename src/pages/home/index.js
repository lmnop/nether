import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Mobile from './Mobile';
import Desktop from './Desktop';

class HomePage extends Component {

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
        {this.state.width >= 800 ? <Desktop /> : <Mobile />}
      </Layout>
    );
  }
}

export default HomePage;
