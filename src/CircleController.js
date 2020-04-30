import React, { useState } from 'react';
import {lineCoordGenerator} from './InnerLineGenerator';

const CircleController = () => {
    const minHeightWidth = 100;
    const maxHeightWidth = 500;
    const paddingMultiplier = 0.1;

    const [noOfPoints, setNoOfPoints] = useState(10);
    const [circleHeightWidth, setCircleHeightWidth] = useState(Math.floor((maxHeightWidth - minHeightWidth)/2));
    const [padding, setpadding] = useState((minHeightWidth * paddingMultiplier).toFixed(2));

    const handleCircleHeightChange = e => {
        setCircleHeightWidth(e.target.value)
        setpadding((e.target.value * paddingMultiplier).toFixed(2));
    };

    const handleNoOfPointsChange = e => setNoOfPoints(e.target.value);

    
    
    const listOfCoords = lineCoordGenerator(circleHeightWidth - (padding/2), noOfPoints);

    // need to add padding to each coord
    const paddedCoords = listOfCoords.map(el => {
        return [el[0] + (padding / 4), el[1] + (padding / 4)]
    });


    const stringListOfCoords = paddedCoords.flat(1).join(" ")
    console.log("string list of coords: ", stringListOfCoords);
    
    
    

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
                    min={10} max={2000} 
                    value={noOfPoints} 
                    onChange={handleNoOfPointsChange}/>
                <input 
                    type="number" name="width" 
                    min={10} max={2000} 
                    value={noOfPoints} 
                    onChange={handleNoOfPointsChange}/>/>
            </label>
            
            <br />
            <svg width={circleHeightWidth} height={circleHeightWidth} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="white"/>
                <circle 
                    cx={circleHeightWidth/2} 
                    cy={circleHeightWidth/2} 
                    r={(circleHeightWidth / 2) - (padding/2)} 
                    stroke="black" strokeWidth="10" fill="none"/>
                <polyline 
                    stroke="black" fill="transparent" strokeWidth="2"
                    points={stringListOfCoords}/>
            </svg>

        </div>
    )
}

export default CircleController;