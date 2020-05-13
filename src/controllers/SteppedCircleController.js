import React, { useState} from 'react';
import { connect } from 'react-redux';
const StepLineGen = require('./StepLineGenerator.js');

/* 
    Most mohr circles self generate a list of points but this "stepped circle controller" is different
    use this to control the points of a single Mohr circle.
*/

const SteppedCircleController = props => {
    // let calcedMoveAmount = ((props.lineMovePercent / 100) * props.circleHiWi).toFixed(2);

    const circleConfig = {
        circleDiam : props.circleHiWi,
        startInCentre : props.centreStart,
        moveAmount : props.lineMoveAmount
    }
    
    const [listOfCoords, setListOfCoords] = useState(StepLineGen.addPointToList([], circleConfig));

    

    const handleNextStep = () => {
        let currentList = [...listOfCoords];
        let newCoords = StepLineGen.addPointToList(currentList, circleConfig);
        setListOfCoords(newCoords);
    }

    const handleUndoStep = () => {
        let currentList = [...listOfCoords];
        if(currentList.length <= 1){
            return;
        }
        currentList.pop();
        setListOfCoords(currentList);
    }

    const handleReset = () => {
        let newCoords = StepLineGen.addPointToList([], circleConfig);
        setListOfCoords(newCoords);
    }

    let canvasWidthHeight = +props.circleHiWi + +props.padding;
    const paddedCoords = listOfCoords.map(el => [el[0] + (props.padding / 2), el[1] + (props.padding / 2)]);
    const stringListOfCoords = paddedCoords.flat(1).join(" ");
    

    const circleHolderStyle = {
        display : "flex",
        flexDirection: "row",
        flexWrap : "wrap",
        justifyContent: "center"
    }

    // setTimeout(() => {
    //     handleNextStep();
    // }, 1000);
    

    return <>
        <button onClick={handleNextStep}>Next step</button>
        <button onClick={handleUndoStep}>Undo</button>
        <button onClick={handleReset}>Reset</button>
        <div style={circleHolderStyle}>
            <svg width={canvasWidthHeight} height={canvasWidthHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="white"/>
                {/* <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"rgb(255,255,0)",stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"rgb(255,0,0)", stopOpacity:1}} />
                    </linearGradient>
                </defs> */}
                {paddedCoords.length === 1 ? 
                    <rect 
                        width="10" height="10"
                        rx="5" ry="5"
                        stroke="gray" fill="gray"
                        x={paddedCoords[0][0]-5} y={paddedCoords[0][1]-5}/>
                    : null}
                <circle 
                    cx={(props.circleHiWi/2) + props.padding/2} 
                    cy={(props.circleHiWi/2) + props.padding/2} 
                    r={(props.circleHiWi / 2)} 
                    stroke="black" strokeWidth="4" fill="none"/>
                <polyline 
                    stroke="black" fill="transparent" strokeWidth="4"
                    strokeLinejoin="round"
                    points={stringListOfCoords}/>
            </svg>
        </div>
        {/* <p>{JSON.stringify(niceDisplay)}</p> */}
    </>;
}

const mapStateToProps = state => {
    return {
        circleHiWi : state.circleWidthHeight,
        padding : state.padding,
        noOfPoints : state.noOfPoints,
        centreStart : state.startInCentre,
        lineMoveAmount : state.moveAmount
    }
}

export default connect(mapStateToProps)(SteppedCircleController);