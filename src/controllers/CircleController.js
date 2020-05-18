import React from 'react';
import { connect } from 'react-redux';
import Input from '../ui/Input';

const CircleController = props => {
    const minHeightWidth = 100, maxHeightWidth = 500;
    const paddingMultiplier = 0.25;

    const handleCircleHeightChange = e => {
        props.onChangeCircleDiam(e.target.value);
        props.onChangeCirclePadding((e.target.value * paddingMultiplier).toFixed(2));
    };


    return (
        <>
            <h3>Circles</h3>
            <div style={{paddingLeft : "5%"}}>
                <label>
                    Circle diameter:
                    <br />
                    <input 
                        type="range" name="diameter" 
                        min={minHeightWidth} max={maxHeightWidth} 
                        value={props.circleDiam} 
                        onChange={handleCircleHeightChange}/>
                        <span>{props.circleDiam}</span>
                </label>
                <br />
                <label>
                    Circle thickness:
                    <br />
                    <input 
                        type="range" name="width" 
                        min={0} max={10} 
                        value={props.circleThickness} 
                        onChange={e => props.onChangeCircleThickness(e.target.value)}/>
                        <span>{props.circleThickness}</span>
                </label>
                <br />
                <label style={{ color : props.currentMode === "multiple" ? "black" : "gray"}}>
                    Number of Mohr Circles:
                    <br />
                    <input 
                        style={{ color : "inherit", textAlign : "center"}}
                        
                        disabled={props.currentMode !== "multiple"}
                        min={1} max={100} 
                        type="range" name="circles" 
                        value={props.circleCount} 
                        onChange={e => props.onChangeCircleCount(e.target.value)}/>
                        <span>{props.circleCount}</span>
                </label>
            </div>

            {/* <p>padding %(slider)</p>
            <p>circle stroke width (slider)</p> */}
        </>
    )
}

const mapStateToProps = state => {
    return {
        circleDiam : state.circleWidthHeight,
        circlePad : state.padding,
        circleCount : state.circleCount,
        currentMode : state.mode,
        circleThickness : state.circleThickness
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeCircleDiam : (newDiam) => dispatch({ type: 'CHANGE_CIRCLE_DIAMETER', newDiam}),
        onChangeCirclePadding : (newPadding) => dispatch({ type: 'CHANGE_CIRCLE_PADDING', newPadding}),
        onChangeCircleCount : (newCircleCount) => dispatch({ type : 'CHANGE_CIRCLE_COUNT', newCircleCount}),
        onChangeCircleThickness : (newThickness) => dispatch({ type : 'CHANGE_CIRCLE_THICKNESS', newThickness})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleController);