import React from 'react';
import { connect } from 'react-redux';
import MohrCircle from './MohrCircle';

const CircleRenderer = props => {

    let canvasWidthHeight = +props.circleDiam + +props.circlePad;
    let circlesArray = [];
    
    for(let i = 0; i < props.circleCount; i++){
        circlesArray.push(<MohrCircle canvasWidthHeight={canvasWidthHeight} key={i}/>);
    }


    const circleHolderStyle = {
        display : "flex",
        flexDirection: "row",
        flexWrap : "wrap",
        justifyContent: "center"
    }

    return(
        <div style={circleHolderStyle}>
            {circlesArray}
        </div>);
}

const mapStateToProps = state => {
    return {
        circleDiam : state.circleWidthHeight,
        circlePad : state.padding,
        circleCount : state.circleCount,
        lineMovePercent : state.lineMovePercent
    }
}

export default connect(mapStateToProps)(CircleRenderer);