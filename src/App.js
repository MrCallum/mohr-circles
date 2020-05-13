import React from 'react';
import './App.css';
import CircleController from './controllers/CircleController';
import LineController from './controllers/LineController';
import CircleRenderer from './MohrCircles/CircleRenderer';
import {AdditionalOptions} from './controllers/AdditionalOptions';
import SteppedCircleController from './controllers/SteppedCircleController';
import {ControllerHolder} from './ui/ControllerHolder';
import ModeController from './controllers/ModeController';

function App() {
  

  return (


    <div className="App">
        <h1>Mohr Circles</h1>
        
        <ControllerHolder>
          <ModeController />
          <LineController />
          <CircleController />
        </ControllerHolder>
        {/* <AdditionalOptions />
        <CircleRenderer /> */}
        <SteppedCircleController />

    </div>
  );
}

export default App;
