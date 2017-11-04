import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';
import Link from '../../components/Link';
import s from './styles.css';

class ErrorPage extends React.Component {

  static propTypes = {
    error: PropTypes.shape({
      status: PropTypes.number,
      message: PropTypes.string,
    }),
  };

  componentDidMount() {
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error';
  }

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    if (this.props.error) console.error(this.props.error); // eslint-disable-line no-consolee

    return (
      <div className={s.container}>
        <main className={s.content}>
          <div className={s.text}>
            You can either <a href="/" onClick={this.goBack}>go back</a> or click to the&nbsp;
            <Link to="/">home page</Link>.
          </div>
        </main>
      </div>
    );
  }

}

export default ErrorPage;
