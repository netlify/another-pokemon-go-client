import React, {PropTypes} from 'react';
import classnames from 'classnames/bind';
import 'normalize.css';

// Using CSS Modules so we assign the styles to a variable
import s from './App.styl';
const cx = classnames.bind(s);
import axios from 'axios';

// Favicon link is in the template, this just makes webpack package it up for us
import './favicon.ico';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setStatus = this.setStatus.bind(this);
    this.state = {status: 'checking status'};
  }

  componentDidMount() {
    this.setStatus();
  }

  setStatus() {
    this.fetchStatus().then((response) => {
      this.setState({status: response});
    }).catch((error) => {
      console.log(error);
      this.setState({status: error});
    });
  }

  fetchStatus() {
    // const url = 'http://localhost:5000/?json=true'
    const url = 'https://is-pokemon-go-up-api-qtwgymmwvt.now.sh/?json=true';
    const init = {
      method: 'GET',
      headers: {},
    };
    return axios.get(url, init)
    .then((res) => {
      console.log(res.data.status);
      return res.data.status;
    })
    .catch((error) => {
      console.log(error);
      return 'Looks like our Server is failed us';
    });
  }

  render() {
    console.log(this.state);
    return (
      <div class='Main'>
        <h2 id='title'>Is Pokémon Go Up?</h2>
        {this.state.status}
      </div>
    );
  }
}

export class NotFound extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <h4>Not found</h4>
      </div>
    );
  }
}

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export class App extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }
  render() {
    return (
      <div className={cx('App')}>
        {this.props.children}
      </div>
    );
  }
}
