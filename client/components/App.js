import React, {PropTypes} from "react";
import classnames from "classnames/bind";
import "normalize.css";
import iso from "./iso.svg";

// Using CSS Modules so we assign the styles to a variable
import s from "./App.styl";
const cx = classnames.bind(s);
import axios from "axios";

// Favicon link is in the template, this just makes webpack package it up for us
import "./favicon.ico";

const gifSelector = (status) => {
  switch (status) {
    case "Yep. Go outside and catch some!":
      return "https://m.popkey.co/6abb47/Jmw09.gif";
    case "Yep, but the servers are struggling :-(":
      return "https://media.giphy.com/media/PiiQ5B1XxxiX6/giphy.gif";
    case "Nope, servers are down! Go back to work.":
      return "https://media.giphy.com/media/R15WrVMPBakLK/giphy.gif";
    case "Error! Probably not a good sign, but try again.":
      return "http://lovelace-media.imgix.net/uploads/186/c9e0a0f0-026a-0133-4582-0a2ca390b447.gif?";
    case "checking status":
      return "";
    default:
      return "https://66.media.tumblr.com/50812e936f6118e3577c990c2bca4341/tumblr_mwpotprvIW1rjenv2o1_500.gif";
  }
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setStatus = this.setStatus.bind(this);
    this.state = {status: "checking status"};
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
    const url = "https://is-pokemon-go-up-api-gyzixdmrat.now.sh/?json=true";
    // const url = "http://localhost:5000/?json=true";
    const init = {
      method: "GET",
      headers: {},
    };
    return axios.get(url, init)
    .then((res) => {
      console.log(res.data.status);
      return res.data.status;
    })
    .catch((error) => {
      console.log(error);
      return "Looks like our Server is failed us";
    });
  }

  render() {
    const {status} = this.state;

    return (
      <div className="Home">
        <div className="title">
          <h2>Is Pokémon Go Up?</h2>
          {status}
        </div>
        <div className="image">
          <img src={gifSelector(status)} />
        </div>
        {status !== "checking status" && <a href="https://github.com/sotojuan/is-pokemon-go-up"><small>made from open source</small></a>}
      </div>
    );
  }
}

export class NotFound extends React.Component {
  render() {
    return (
      <div className={cx("page")}>
        <h2>Page not found</h2>
        <img src={gifSelector()} />
      </div>
    );
  }
}

export class App extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }
  render() {
    return (
      <div className={cx("App")}>
        <div className="content">
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}

export class Footer extends React.Component {
  render() {
    return (
      <div className={cx("Footer")}>
        <p>Powered<br /> by</p>
        <a href="http://netlify.com"><img src={iso} /></a>
      </div>
    );
  }
}
