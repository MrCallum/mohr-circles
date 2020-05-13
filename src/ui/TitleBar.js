import React from 'react';

const barStyle = {
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "white",
  height: "10vh",
  zIndex: 10,
  borderBottom : "1px solid gray"
};

export const TitleBar = props => (
    <div style={barStyle}>
          <h1>Mohr Circles</h1>
    </div>
);