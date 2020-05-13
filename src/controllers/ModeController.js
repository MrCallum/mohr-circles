import React from 'react';
import { connect } from 'react-redux';

const ModeController = props => {
    const handleModeChange = (e) => {
        props.onToggleMode();
    }

    return (
        <>
            <h3>Current Mode</h3>
            <button 
                onClick={handleModeChange} 
                disabled={props.currentMode !== "multiple"}>Multiple</button>
            <button 
                onClick={handleModeChange}
                disabled={props.currentMode !== "single"}>Single</button>
            <p>This is some explanatory text to help the user understand a little more about what they are doing</p>
        </>
    );
}

const mapStateToProps = state => {
    return {
        currentMode : state.mode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleMode : () => dispatch({type : 'TOGGLE_MODE'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModeController);