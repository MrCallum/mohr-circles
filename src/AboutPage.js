import React from 'react';

export const AboutPage = props => {
    const style = {
        width : "100%",
        height : "90vh",
        backgroundColor : "white",
        position : "fixed",
        top : props.topOffset,
        left: 0,
        padding : "5% 20% 5% 5%",
        zIndex : 20,
        boxSizing : "border-box",
        textAlign : "left",
        transition : "0.7s"
    };
    
    return (
        <div style={style}>
            <h1>What are Mohr Circles?</h1>
            <p>Manfred Mohr is New York based, German born digital artist. I found <a href="http://www.emohr.com/sc69-73/vfile_48.html" target="blank">this</a> and tried to make my own version. This work doesn't seem to have a title, so I've called these 'Mohr Circles'.</p>
            <p>From some brief text on that page, and by observing Mohr's examples, the inner line has four rules</p>
            <ul>
                <li>A line should be made up of 6 connected smaller lines.</li>
                <li>Lines should connect at multiples of 45 degrees.</li>
                <li>The next line may not double back on the last.</li>
                <li>Lines can be any length that fit inside the circle (my implementation does not obey this rule. Instead, lines are fixed in length).</li>
            </ul>
            <h1>Who made this?</h1>
            <p><a href="http://www.callum-morrison.com" target="blank">Callum Morrison</a> in Edinburgh during COVID19. This is my first foray into digital / generative art. Send me an <a href="mailto:mrcallummorrison@gmail.com">email</a> if you would like to see anything added / have any feedback</p>
        </div>);
};