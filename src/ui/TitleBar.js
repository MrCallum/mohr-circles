import React, {useState} from 'react';
import { AboutPage } from '../AboutPage';

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

const aboutButton = {
  position : "fixed",
  left : "5vh",
  top : "2vh",
  height : "6vh",
  boxSizing : "border-box",
  backgroundColor : "inherit",
  border : "none",
  fontSize : "2vh",
}

export const TitleBar = props => {
  const [showAboutPage, setShowAboutPage ] = useState(false);


  return (
    <>
      <div style={barStyle}>
        <button style={aboutButton} onClick={() => setShowAboutPage(!showAboutPage)}>[ {showAboutPage ? "close" : "about"} ]</button>
        <h1>Mohr Circles</h1>
      </div>
      <AboutPage topOffset={showAboutPage ? "10vh" : "100vh"}/>
    </>
  )
};