import React from 'react';
import { connect } from 'react-redux';
import Input from '../ui/Input';

const LineController = props => {

    return (
        <>
            <h3>Line</h3>
            <div style={{paddingLeft : "5%"}}>
                <label>
                    Start in centre:
                    <br />
                    <Input 
                        inputType="checkbox" inputName="center" 
                        inputValue={props.centreStart} 
                        handleClick={() => props.onToggleCentreStart()}/>
                </label>
                <br />
                <label>
                    Highlight start point:
                    <br />
                    <Input 
                        inputType="checkbox" inputName="show start" 
                        inputValue={props.showStartPoint} 
                        handleClick={() => props.onToggleShowStartPoint()}/>
                </label>
                <br />
                <label>
                    Highlight end point:
                    <br />
                    <Input 
                        inputType="checkbox" inputName="show end" 
                        inputValue={props.showEndPoint} 
                        handleClick={() => props.onToggleShowEndPoint()}/>
                </label>
                <br />
               
                <label style={{ color : props.currentMode === "multiple" ? "black" : "gray"}}>
                    Number of points:
                    <br />
                    <input
                        disabled={props.currentMode !== "multiple"}
                        style={{ color : "inherit"}}
                        type="range" name="points" 
                        min={3} max={15} 
                        value={props.noOfPoints} 
                        onChange={(e) => props.onChangePointCount(e.target.value)}/>
                    <span>{props.noOfPoints}</span>
                </label>
                <br />
                <label>
                    Line movement distance (as % of diameter):
                    <br />
                    <input 
                        type="range" name="move-percent" 
                        min={10} max={49} 
                        value={props.lineMovePercent} 
                        onChange={(e) => props.onChangeLineMovePercent(e.target.value)}/>
                        <span>{props.lineMovePercent}%</span>
                </label>
                <br />
                <label>
                    Line thickness:
                    <br />
                    <input 
                        type="range" name="line thickness" 
                        min={1} max={10} 
                        value={props.lineThickness} 
                        onChange={(e) => props.onChangeLineThickness(e.target.value)}/>
                        <span>{props.lineThickness}</span>
                </label>

            </div>
        </>);
}

const mapStateToProps = state => {
    return {
        noOfPoints : state.noOfPoints,
        centreStart : state.startInCentre,
        lineMovePercent : state.lineMovePercent,
        showStartPoint : state.showStartPoint,
        showEndPoint : state.showEndPoint,
        currentMode : state.mode,
        lineThickness : state.lineThickness
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePointCount : (newPointCount) => dispatch({type : 'CHANGE_POINT_COUNT', newPointCount}),
        onToggleCentreStart : () => dispatch({type : 'TOGGLE_START_IN_CENTRE'}),
        onChangeLineMovePercent : (newPercent) => dispatch({type : 'CHANGE_LINE_MOVE_PERCENT', newPercent}),
        onToggleShowStartPoint : () => dispatch({type : 'TOGGLE_SHOW_START_POINT'}),
        onToggleShowEndPoint : () => dispatch({type : 'TOGGLE_SHOW_END_POINT'}),
        onChangeLineThickness : (newThickness) => dispatch({ type : 'CHANGE_LINE_THICKNESS', newThickness})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineController);