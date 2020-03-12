import React, { Component } from "react";
import { healthy } from "../api"
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
    healthy().then(res => {
        if (res) {
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
