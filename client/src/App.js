import React, { Component } from 'react';
import './App.css';
import { ServerHealth } from './serverhealth/ServerHealth';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ServerHealth />
        </header>
        <main className="App-main">
          <p>Placeholder</p>
        </main>
      </div>
    );
  }
}
