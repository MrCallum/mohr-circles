import React, { useState } from 'react';
import { connect } from 'react-redux';
import SLG from './StepLineGenerator.js';
import Style from './SteppedCircleController.module.css';

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
    
    const [listOfCoords, setListOfCoords] = useState(SLG.addPointToList([], circleConfig));
    const [lastUsedDiam, setLastUsedDiam] = useState(circleConfig.circleDiam);
    

    const handleNextStep = () => {
        let currentList = [...listOfCoords];
        if(lastUsedDiam !== circleConfig.circleDiam){
            // circle diam has changed. check if current point is inside circle
            const currentPoint = currentList[Math.max(currentList.length - 1, 0)];
            if(!SLG.checkInsideCircle(circleConfig.circleDiam, currentPoint)){
                console.log("Circle diam changed and point was outside circle. Resetting");
                setLastUsedDiam(circleConfig.circleDiam);
                handleReset();
                return;
            } 
            // otherwise, continue
        }

        let newCoords = SLG.addPointToList(currentList, circleConfig);
        setListOfCoords(newCoords);
        setLastUsedDiam(circleConfig.circleDiam);
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
        let newCoords = SLG.addPointToList([], circleConfig);
        setListOfCoords(newCoords);
    }

    let canvasWidthHeight = +props.circleHiWi + +props.padding;
    const paddedCoords = listOfCoords.map(el => [el[0] + (props.padding / 2), el[1] + (props.padding / 2)]);
    const stringListOfCoords = paddedCoords.flat(1).join(" ");

    const isLandscape = window.innerWidth > window.innerHeight;

    return <>
        <div className={isLandscape ? Style.ButtonHolder : null}>
            <button className={Style.Button} onClick={handleUndoStep}>&#8592;</button>
            <button className={Style.Button} onClick={handleReset}>&#8634;</button>
            <button className={Style.Button} onClick={handleNextStep}> &#8594;</button>
        </div>

        <div className={isLandscape ? Style.CircleHolderDesktop : Style.CircleHolderMobile}>
            <svg width={canvasWidthHeight} height={canvasWidthHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="white"/>
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
                    stroke="black" strokeWidth={props.circleThickness} fill="none"/>
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
            </svg>
        </div>
    </>;
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

export default connect(mapStateToProps)(SteppedCircleController);