import React from 'react';
import './App.css';
import CircleController from './controllers/CircleController';
import LineController from './controllers/LineController';
import CircleRenderer from './MohrCircles/CircleRenderer';
import {AdditionalOptions} from './controllers/AdditionalOptions';

import SteppedCircleRenderer from './MohrCircles/SteppedCircleRenderer';

function App() {
  

  return (


    <div className="App">
        <h1>Mohr Circles</h1>
        <LineController />
        <CircleController />
        {/* <AdditionalOptions />
        <CircleRenderer /> */}
        <SteppedCircleRenderer />
    </div>
  );
}

export default App;
