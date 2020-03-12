import React, { useState } from 'react';
import './App.css';
import { ServerHealth } from './serverhealth/ServerHealth';
import { SimulationForm } from './simulation/SimulationForm';
import { simulate } from './api';

export function App() {
  const [result, setResult] = useState(undefined)

  async function runSimulation({ numberOfRuns, changeDoor }) {
    const response = await simulate({ numberOfRuns, changeDoor });
    setResult(response)
  }

  return (
      <div className="App">
        <header className="App-header">
          <ServerHealth />
        </header>
        <main className="App-main">
          <div className="App-container">
            <SimulationForm onSubmit={runSimulation} />
          </div>
          {result && <span>{result.ratio*100}%</span>}
        </main>
      </div>
  )
}
