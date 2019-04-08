import React, { Component } from "react";
import axios from 'axios';
import './ServerHealth.css';

class ServerHealth extends Component {

  constructor(props) {
    super(props);
    this.state = { serverHealth: 'UNKNOWN' };
  }

  componentDidMount() {
    this.getHealth();
    this.interval = setInterval(this.getHealth, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getHealth = () => {
    axios.get('/health')
      .then(res => {
        if (res.status === 200) {
          this.setState({ serverHealth: 'UP' });
        } else {
          this.setState({ serverHealth: 'DOWN' });
        }
      })
      .catch(res => {
        console.log(res);
        this.setState({ serverHealth: 'DOWN' });
      });
  };

  render() {
    return (
      <div className="serverHealth">
        <p>Backend is: <a className={this.state.serverHealth}>{this.state.serverHealth}</a></p>
      </div>
    );
  }

}

export default ServerHealth;
