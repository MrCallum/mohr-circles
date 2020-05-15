import React from 'react';
import { connect } from 'react-redux';

const ModeController = props => {
    return (
        <>
            <h3>Mode</h3>
            <div style={{paddingLeft : "5%"}}>
                <button 
                    onClick={() => props.onToggleMode()} 
                    disabled={props.currentMode === "multiple"}>Multiple</button>
                <button 
                    onClick={() => props.onToggleMode()}
                    disabled={props.currentMode === "single"}>Single</button>
                <p>{props.currentMode === "multiple" ? "Generate an array of Mohr Circles" : "Generate just one Mohr circle, but with fine control over the line. If you see a dot, that's the starting point"}</p>
            </div>
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