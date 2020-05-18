import React from 'react';
import Style from './RenderHolder.module.css'

export const RendererHolder = props => {
    const isLandscape = window.innerWidth > window.innerHeight;
    const extraClass = isLandscape ? null : Style.FullWidth;

    return(
        <div className={[Style.RenderHolder, extraClass].join(" ")}>{props.children}</div>
    );
};
