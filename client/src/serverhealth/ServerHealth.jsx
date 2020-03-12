import React, { Component } from "react";
import axios from 'axios';
import './ServerHealth.css';

export class ServerHealth extends Component {

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
      .catch(error => {
        console.log(error);
        this.setState({ serverHealth: 'DOWN' });
      });
  };

  render() {
    return (
      <div className="serverHealth">
        <p>Backend is: <span className={this.state.serverHealth}>{this.state.serverHealth}</span></p>
      </div>
    );
  }

}
