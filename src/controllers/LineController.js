import React from 'react';
import { connect } from 'react-redux';

const LineController = props => {

    const handleNoOfPointsChange = e => props.onChangePointCount(e.target.value);
    const handleCenterStartToggle = () => props.onToggleCentreStart();
    const handleLineMovePercentChange = e => props.onChangeLineMovePercent(e.target.value);

    return (
        <div>
            <h3>Line Controller</h3>
            <label>
                Number of points:
                <br />
                <input 
                    type="range" name="points" 
                    min={3} max={1500} 
                    value={props.noOfPoints} 
                    onChange={handleNoOfPointsChange}/>
                <span>{props.noOfPoints}</span>
            </label>
            <br />
            <label>
                Start in centre:
                <br />
                <input 
                    type="checkbox" name="center" 
                    value={props.centreStart} 
                    onChange={handleCenterStartToggle}/>
            </label>
            <br />
            <label>
                Line movement distance (as % of diameter):
                <br />
                <input 
                    type="range" name="move-percent" 
                    min={1} max={50} 
                    value={props.lineMovePercent} 
                    onChange={handleLineMovePercentChange}/>
                    <span>{props.lineMovePercent}%</span>
            </label>

            <p>line stroke width (slider)</p>
            <p>line distance as % of diam (slider)</p>
            <p>circle stroke colour(picker)</p>
        </div>);
}

const mapStateToProps = state => {
    return {
        noOfPoints : state.noOfPoints,
        centreStart : state.startInCentre,
        lineMovePercent : state.lineMovePercent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePointCount : (newPointCount) => dispatch({type : 'CHANGE_POINT_COUNT', newPointCount}),
        onToggleCentreStart : () => dispatch({type : 'TOGGLE_START_IN_CENTRE'}),
        onChangeLineMovePercent : (newPercent) => dispatch({type : 'CHANGE_LINE_MOVE_PERCENT', newPercent})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineController);