import React from 'react';

const outerHolder = {
    width : "20%",
    boxSizing: "border-box",
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
    width : "inherit",
    boxSizing : "inherit",
    textAlign : "left",
    padding : "1%",
    backgroundColor  : "white",
    position : "fixed",
    height  : "90vh",
    overflowY : "scroll",
    borderRight : "1px solid gray"
}

export const ControllerHolder = props => (
    <div style={outerHolder}>
        <div style={gap}/>
        <div style={innerHolder}>{props.children}</div>
    </div>);
