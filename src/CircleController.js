import React, { useState } from 'react';
import {generateSemiRandomSeries} from './InnerLineGenerator';
import MohrCircle from './MohrCircle';

const CircleController = () => {
    const minHeightWidth = 100;
    const maxHeightWidth = 500;
    const paddingMultiplier = 0.25;

    const [noOfPoints, setNoOfPoints] = useState(10);
    const [circleHeightWidth, setCircleHeightWidth] = useState(Math.floor(maxHeightWidth / 4));
    const [padding, setpadding] = useState((circleHeightWidth * paddingMultiplier).toFixed(2));
    const [noOfCircles, setNoOfCircles] = useState(1);

    const handleCircleHeightChange = e => {
        setCircleHeightWidth(e.target.value)
        setpadding((e.target.value * paddingMultiplier).toFixed(2));
    };

    const handleNoOfPointsChange = e => setNoOfPoints(e.target.value);
    const handleNoOfCirclesChange = e => setNoOfCircles(e.target.value);


    
    
    // const listOfCoords = lineCoordGenerator(circleHeightWidth , noOfPoints);
    const listOfCoords = generateSemiRandomSeries(circleHeightWidth , noOfPoints);

    // need to add padding to each coord
    const paddedCoords = listOfCoords.map(el => {
        return [el[0] + (padding / 2), el[1] + (padding / 2)]
    });


    const stringListOfCoords = paddedCoords.flat(1).join(" ")
    // console.log("string list of coords: ", stringListOfCoords);
    
    let canvasWidthHeight = +circleHeightWidth + +padding;
    
    let circlesArray = [];
    circlesArray.fill();
    for(let i = 0; i < noOfCircles; i++){
        circlesArray.push(<MohrCircle 
            canvasWidthHeight={canvasWidthHeight} 
            circleHeightWidth={circleHeightWidth} 
            padding={padding} 
            noOfPoints={noOfPoints} 
            key={i}/>);
    }


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
            <div>
                {circlesArray}

            </div>

           
            
        </div>
    )
}

export default CircleController;