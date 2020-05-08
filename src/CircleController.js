import React, { useState } from 'react';
import {generateSemiRandomSeries} from './InnerLineGenerator';

const CircleController = () => {
    const minHeightWidth = 100;
    const maxHeightWidth = 500;
    const paddingMultiplier = 0.25;

    const [noOfPoints, setNoOfPoints] = useState(10);
    const [circleHeightWidth, setCircleHeightWidth] = useState(Math.floor(maxHeightWidth));
    const [padding, setpadding] = useState((circleHeightWidth * paddingMultiplier).toFixed(2));

    const handleCircleHeightChange = e => {
        setCircleHeightWidth(e.target.value)
        setpadding((e.target.value * paddingMultiplier).toFixed(2));
    };

    const handleNoOfPointsChange = e => setNoOfPoints(e.target.value);

    
    
    // const listOfCoords = lineCoordGenerator(circleHeightWidth , noOfPoints);
    const listOfCoords = generateSemiRandomSeries(circleHeightWidth , noOfPoints);

    // need to add padding to each coord
    const paddedCoords = listOfCoords.map(el => {
        return [el[0] + (padding / 2), el[1] + (padding / 2)]
    });


    const stringListOfCoords = paddedCoords.flat(1).join(" ")
    // console.log("string list of coords: ", stringListOfCoords);
    
    let canvasWidthHeight = +circleHeightWidth + +padding;
    

    return (
        <div>
            <p>Padding: {padding}</p>
            <label>
                Circle dimensions:
                <input 
                    type="range" name="width" 
                    min={minHeightWidth} max={maxHeightWidth} 
                    value={circleHeightWidth} 
                    onChange={handleCircleHeightChange}/>
                    <span>{circleHeightWidth}</span>
            </label>
            <br />
            <label>
                Number of points:
                <input 
                    type="range" name="width" 
                    min={3} max={15} 
                    value={noOfPoints} 
                    onChange={handleNoOfPointsChange}/>
                <span>{noOfPoints}</span>
            </label>
            
            <br />
            <svg width={canvasWidthHeight} height={canvasWidthHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="white"/>
                <circle 
                    cx={(circleHeightWidth/2) + padding/2} 
                    cy={(circleHeightWidth/2) + padding/2} 
                    r={(circleHeightWidth / 2)} 
                    stroke="black" strokeWidth="4" fill="none"/>
                <polyline 
                    stroke="black" fill="transparent" strokeWidth="4"
                    points={stringListOfCoords}/>
            </svg>

        </div>
    )
}

export default CircleController;