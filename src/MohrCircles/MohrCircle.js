import React from 'react';
import { connect } from 'react-redux';
const LineGenerator = require('../controllers/StepLineGenerator');

// Mohr Circle.
// Quite independent. It generates own coord list, works out padding etc.

const MohrCircle = props => {  
    const circleConfig = {
        circleDiam : props.circleHiWi,
        startInCentre : props.centreStart,
        moveAmount : props.lineMoveAmount
    }
    
    const listOfCoords = LineGenerator.generateListOfCoords(props.noOfPoints, circleConfig);

    let paddedCoords, stringListOfCoords, circleColour;
    if(!listOfCoords){
        console.warn("[MohrCircle.js] No list of coords supplied")
    } else {
        paddedCoords = listOfCoords.map(el => [el[0] + (props.padding / 2), el[1] + (props.padding / 2)]);
        stringListOfCoords = paddedCoords.flat(1).join(" ");
        circleColour = listOfCoords.length < props.noOfPoints ? "blue" : "black";
    }


    return (
        <>
            <svg width={props.canvasWidthHeight} height={props.canvasWidthHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="white"/>
                {/* <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"rgb(255,255,0)",stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"rgb(255,0,0)", stopOpacity:1}} />
                    </linearGradient>
                </defs> */}
                
                <circle 
                    cx={(props.circleHiWi/2) + props.padding/2} 
                    cy={(props.circleHiWi/2) + props.padding/2} 
                    r={(props.circleHiWi / 2)} 
                    stroke={circleColour} strokeWidth={props.circleThickness} fill="none"/>
                {stringListOfCoords ? 
                    <>
                        <polyline 
                            stroke="black" fill="transparent" strokeWidth={props.lineThickness}
                            strokeLinejoin="round"
                            points={stringListOfCoords}/> 
                        {props.showStartPoint ? 
                            <rect 
                            width={props.lineThickness * 2} height={props.lineThickness * 2}
                            stroke="red" fill="red"
                            rx={props.lineThickness} ry={props.lineThickness}
                            x={paddedCoords[0][0]-props.lineThickness} y={paddedCoords[0][1]-props.lineThickness}/> : null}
                        {props.showEndPoint ? 
                            <rect 
                            width={props.lineThickness * 2} height={props.lineThickness * 2}
                            stroke="blue" fill="blue"
                            rx={props.lineThickness} ry={props.lineThickness}
                            x={paddedCoords[paddedCoords.length-1][0]-props.lineThickness} y={paddedCoords[paddedCoords.length-1][1]-props.lineThickness}/> : null}
                    </>
                : null}
                
            </svg>
        </>
    );

}

const mapStateToProps = state => {
    return {
        circleHiWi : state.circleWidthHeight,
        padding : state.padding,
        noOfPoints : state.noOfPoints,
        centreStart : state.startInCentre,
        lineMoveAmount : state.moveAmount,
        showStartPoint : state.showStartPoint,
        showEndPoint : state.showEndPoint,
        circleThickness : state.circleThickness,
        lineThickness : state.lineThickness
    }
}

export default connect(mapStateToProps)(MohrCircle);