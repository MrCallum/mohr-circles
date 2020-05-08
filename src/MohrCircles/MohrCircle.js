import React from 'react';
import {generateSemiRandomSeries} from './InnerLineGenerator';

const MohrCircle = props => {  
    // const listOfCoords = lineCoordGenerator(circleHeightWidth , noOfPoints);
    const listOfCoords = generateSemiRandomSeries(props.circleHeightWidth , props.noOfPoints);

    // need to add padding to each coord
    const paddedCoords = listOfCoords.map(el => {
        return [el[0] + (props.padding / 2), el[1] + (props.padding / 2)]
    });


    const stringListOfCoords = paddedCoords.flat(1).join(" ")
    // console.log("string list of coords: ", stringListOfCoords);

    return (
        <svg width={props.canvasWidthHeight} height={props.canvasWidthHeight} version="1.1" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white"/>
            {/* <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:"rgb(255,255,0)",stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:"rgb(255,0,0)", stopOpacity:1}} />
                </linearGradient>
            </defs> */}
            <circle 
                cx={(props.circleHeightWidth/2) + props.padding/2} 
                cy={(props.circleHeightWidth/2) + props.padding/2} 
                r={(props.circleHeightWidth / 2)} 
                stroke="black" strokeWidth="4" fill="none"/>
            <polyline 
                stroke="black" fill="transparent" strokeWidth="4"
                strokeLinejoin="round"
                points={stringListOfCoords}/>
        </svg>
    );

}

export default MohrCircle;