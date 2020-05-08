import React, { useState } from 'react';
import {generateSemiRandomSeries} from '../MohrCircles/InnerLineGenerator';
import MohrCircle from '../MohrCircles/MohrCircle';
import { connect } from 'react-redux';

const CircleController = props => {
    const minHeightWidth = 100, maxHeightWidth = 500;
    const paddingMultiplier = 0.25;

    const [noOfPoints, setNoOfPoints] = useState(10);
    const [noOfCircles, setNoOfCircles] = useState(6);

    const handleCircleHeightChange = e => {
        props.onChangeCircleDiam(e.target.value);
        props.onChangeCirclePadding((e.target.value * paddingMultiplier).toFixed(2));
    };

    const handleNoOfPointsChange = e => setNoOfPoints(e.target.value);
    const handleNoOfCirclesChange = e => setNoOfCircles(e.target.value);


    
    
    // const listOfCoords = lineCoordGenerator(circleHeightWidth , noOfPoints);
    const listOfCoords = generateSemiRandomSeries(props.circleDiam , noOfPoints);

    // need to add padding to each coord
    const paddedCoords = listOfCoords.map(el => {
        return [el[0] + (props.circlePad / 2), el[1] + (props.circlePad / 2)]
    });

    
    let canvasWidthHeight = +props.circleDiam + +props.circlePad;
    
    let circlesArray = [];
    circlesArray.fill();
    for(let i = 0; i < noOfCircles; i++){
        circlesArray.push(
            <MohrCircle 
                canvasWidthHeight={canvasWidthHeight} 
                padding={props.circlePad} 
                noOfPoints={noOfPoints} 
                key={i}/>);
    }

    const circleHolderStyle = {
        display : "flex",
        flexDirection: "row",
        flexWrap : "wrap",
        justifyContent: "center"
    }

    return (
        <div>
            <p>Padding: {props.circlePad}</p>
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
                Number of points:
                <input 
                    type="range" name="points" 
                    min={3} max={15} 
                    value={noOfPoints} 
                    onChange={handleNoOfPointsChange}/>
                <span>{noOfPoints}</span>
            </label>
            <br />
            <label>
                Number of Mohr Circles:
                <input 
                    type="range" name="circles" 
                    min={1} max={100} 
                    value={noOfCircles} 
                    onChange={handleNoOfCirclesChange}/>
                <span>{noOfCircles}</span>
            </label>
            
            <br />
            <div style={circleHolderStyle}>
                {circlesArray}

            </div>
           
            
        </div>
    )
}

const mapStateToProps = props => {
    return {
        circleDiam : props.circleWidthHeight,
        circlePad : props.padding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeCircleDiam : (newDiam) => dispatch({ type: 'CHANGE_CIRCLE_DIAMETER', newDiam}),
        onChangeCirclePadding : (newPadding) => dispatch({ type: 'CHANGE_CIRCLE_PADDING', newPadding})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleController);