import React from 'react';
import { connect } from 'react-redux';

const CircleController = props => {
    const minHeightWidth = 100, maxHeightWidth = 500;
    const paddingMultiplier = 0.25;

    const handleCircleHeightChange = e => {
        props.onChangeCircleDiam(e.target.value);
        props.onChangeCirclePadding((e.target.value * paddingMultiplier).toFixed(2));
    };

    const handleNoOfCirclesChange = e => props.onChangeCircleCount(e.target.value);


    return (
        <div style={{border : "1px solid gray", margin : "0 20%"}}>
            <h3>Circle Controller</h3>
            <label>
                Circle dimensions:
                <input 
                    type="range" name="width" 
                    min={minHeightWidth} max={maxHeightWidth} 
                    value={props.circleDiam} 
                    onChange={handleCircleHeightChange}/>
                    <span>{props.circleDiam}</span>
            </label>
            <br />
            <label>
                Number of Mohr Circles:
                <input 
                    type="number" name="circles" 
                    min={1} max={100} 
                    value={props.circleCount} 
                    onChange={handleNoOfCirclesChange}/>
                <span>{props.circleCount}</span>
            </label>
            <p>padding %(slider)</p>
            <p>circle stroke width (slider)</p>
            <p>circle stroke colour(picker)</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        circleDiam : state.circleWidthHeight,
        circlePad : state.padding,
        circleCount : state.circleCount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeCircleDiam : (newDiam) => dispatch({ type: 'CHANGE_CIRCLE_DIAMETER', newDiam}),
        onChangeCirclePadding : (newPadding) => dispatch({ type: 'CHANGE_CIRCLE_PADDING', newPadding}),
        onChangeCircleCount : (newCircleCount) => dispatch({ type : 'CHANGE_CIRCLE_COUNT', newCircleCount})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleController);