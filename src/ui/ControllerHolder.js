import React from 'react';
import Style from './ControllerHolder.module.css';


export const ControllerHolder = props => {
    const isLandscape = window.innerWidth > window.innerHeight;
    const extraClass = isLandscape ? Style.SideBar : Style.FullWidth;


    return(
        <div className={[Style.ControllerHolder, extraClass].join(" ")}>
            {props.children}
        </div>
    );
};
