import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import CircleController from './controllers/CircleController';
import LineController from './controllers/LineController';
import CircleRenderer from './MohrCircles/CircleRenderer';
import {AdditionalOptions} from './controllers/AdditionalOptions';
import SteppedCircleController from './controllers/SteppedCircleController';
import {ControllerHolder} from './ui/ControllerHolder';
import {RendererHolder} from './ui/RendererHolder';
import ModeController from './controllers/ModeController';
import {TitleBar} from './ui/TitleBar';

function App(props) {
  
  

  return (


    <div className="App">
        
        <TitleBar />
        <ControllerHolder>
          <ModeController />
          <LineController />
          <CircleController />
        </ControllerHolder>
        {/* <AdditionalOptions />*/}
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