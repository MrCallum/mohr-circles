import React from 'react';
import { connect } from 'react-redux';
import MohrCircle from './MohrCircle';

const SteppedCircleRenderer = props => {
    const handleNextStep = () => {

    }

    return <>
    <button onClick={handleNextStep}>Next step</button>
        <MohrCircle />
    </>;
}

const mapStateToProps = state => {
    return {
        circleDiam : state.circleWidthHeight,
        circlePad : state.padding,
        circleCount : state.circleCount
    }
}

export default connect(mapStateToProps)(SteppedCircleRenderer);