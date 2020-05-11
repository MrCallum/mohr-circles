const initialState = {
    circleWidthHeight : 400,
    padding : 25,
    noOfPoints : 10,
    circleCount : 5,
    startInCentre : false,
    lineMovePercent : 25
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'CHANGE_CIRCLE_DIAMETER' : 
            return {
                ...state,
                circleWidthHeight : action.newDiam
            };
        case 'CHANGE_CIRCLE_PADDING' : 
            return {
                ...state,
                padding : action.newPadding
            };
        case 'CHANGE_POINT_COUNT':
            return {
                ...state,
                noOfPoints : action.newPointCount
            }
        case 'CHANGE_CIRCLE_COUNT':
            return {
                ...state,
                circleCount : action.newCircleCount
            }
        case 'TOGGLE_START_IN_CENTRE':
            return {
                ...state,
                startInCentre : !state.startInCentre
            }
        case 'CHANGE_LINE_MOVE_PERCENT':
            return {
                ...state,
                lineMovePercent : action.newPercent
            }
        default :
            console.log("[Reducer] Action was unhandled: " + JSON.stringify(action));
            return state;
    }
}

export default reducer;
