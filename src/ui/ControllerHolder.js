import React from 'react';


const outerHolder = {
    position : "absolute",
    backgroundColor : "transparent",
    left : 0,
    top : 0
}

const gap = {
    height  : "10vh",
    backgroundColor : "transparent",
}

const innerHolder = {
    padding : "1%",
    backgroundColor  : "#EEE",
    width : "20%",
    position : "fixed",
    height  : "90vh",
    overflowY : "scroll"
}

export const ControllerHolder = props => (
    <div style={outerHolder}>
        <div style={gap}/>
        <div style={innerHolder}>{props.children}</div>
    </div>);
