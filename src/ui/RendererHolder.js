import React from 'react';

const holder = {
    padding : "1%",
    width : "80%",
    position : "absolute",
    right: 0,
    top : "10vh",
    boxSizing: "border-box"
}

export const RendererHolder = props => <div style={holder}>{props.children}</div>;
