import React from 'react';

// checkboxes: does some style handling

const Input = props => {

    const checkboxStyle = {
        height : "2vh",
        width : "2vh"
    }

    return (
        <input
            type={props.inputType}
            name={props.inputName}
            value={props.inputValue}
            onChange={props.handleClick}
            min={props.inputMin}
            max={props.inputMax}
            disabled={props.inputDisabled}

            style={checkboxStyle}/>
    );
}

export default Input;