import React from 'react';

const Input = props => {

    const Style = {
        height : "2vh",
        width : "2vh"
    }

    if(window.innerWidth < window.innerHeight){
        
    }

    return (
        <input
            type={props.inputType}
            name={props.inputName}
            value={props.inputValue}
            onChange={props.handleClick}
            style={Style}/>
    );
}

export default Input;