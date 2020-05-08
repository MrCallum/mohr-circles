import React from 'react';
import './App.css';
import CircleController from './controllers/CircleController';
import LineController from './controllers/LineController';
import CircleRenderer from './MohrCircles/CircleRenderer';

function App() {
  

  return (


    <div className="App">
        <h1>Mohr Circles</h1>
        <LineController />
        <CircleController />
        <CircleRenderer />
    </div>
  );
}

export default App;
