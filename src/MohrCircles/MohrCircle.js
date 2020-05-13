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
                    stroke={circleColour} strokeWidth="4" fill="none"/>
                {stringListOfCoords ? 
                    <>
                        <polyline 
                            stroke="black" fill="transparent" strokeWidth="2"
                            strokeLinejoin="round"
                            points={stringListOfCoords}/> 
                        {props.showStartPoint ? 
                            <rect 
                            width="5" height="5"
                            stroke="red" fill="red"
                            rx="2.5" ry="2.5"
                            x={paddedCoords[0][0]-2.5} y={paddedCoords[0][1]-2.5}/> : null}
                        {props.showEndPoint ? 
                            <rect 
                            width="5" height="5"
                            stroke="blue" fill="blue"
                            rx="2.5" ry="2.5"
                            x={paddedCoords[paddedCoords.length-1][0]-2.5} y={paddedCoords[paddedCoords.length-1][1]-2.5}/> : null}
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
        showEndPoint : state.showEndPoint
    }
}

export default connect(mapStateToProps)(MohrCircle);