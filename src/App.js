import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import CircleController from './controllers/CircleController';
import LineController from './controllers/LineController';
import SteppedCircleController from './controllers/SteppedCircleController';

import ModeController from './controllers/ModeController';
import {ControllerHolder} from './ui/ControllerHolder';
import {TitleBar} from './ui/TitleBar';
import {RendererHolder} from './ui/RendererHolder';
import CircleRenderer from './MohrCircles/CircleRenderer';

function App(props) {
  return (
    <div className="App">
        
        <TitleBar />
        <ControllerHolder>
          <ModeController />
          <LineController />
          <CircleController />
        </ControllerHolder>
        <RendererHolder>
          
          {props.currentMode === "single" ?
            <SteppedCircleController />
            : <CircleRenderer /> }
        </RendererHolder>

    </div>
  );
}

const mapStateToProps = state => {
  return {
      currentMode : state.mode
  }
}

export default connect(mapStateToProps)(App);