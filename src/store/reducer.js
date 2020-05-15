const initialState = {
    circleWidthHeight : 150,
    padding : 25,
    noOfPoints : 10,
    circleCount : 30,
    startInCentre : false,
    lineMovePercent : 15,
    moveAmount : 22.5,
    mode : "multiple",
    showStartPoint : false,
    showEndPoint : false,
    circleThickness : 4,
    lineThickness : 2

};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'CHANGE_CIRCLE_DIAMETER' : 
            return {
                ...state,
                circleWidthHeight : action.newDiam,
                moveAmount : Math.floor((state.lineMovePercent / 100) * state.circleWidthHeight)
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
        case 'TOGGLE_SHOW_START_POINT':
            return {
                ...state,
                showStartPoint : !state.showStartPoint
            }
        case 'TOGGLE_SHOW_END_POINT':
            return {
                ...state,
                showEndPoint : !state.showEndPoint
            }
        
        case 'CHANGE_LINE_MOVE_PERCENT':
            return {
                ...state,
                lineMovePercent : action.newPercent,
                moveAmount : Math.floor((state.lineMovePercent / 100) * state.circleWidthHeight)
            }
        case 'CHANGE_CIRCLE_THICKNESS':
            return {
                ...state,
                circleThickness : action.newThickness
            }
        case 'CHANGE_LINE_THICKNESS':
            return {
                ...state,
                lineThickness : action.newThickness
            }
        case 'TOGGLE_MODE':
            return {
                ...state,
                mode : state.mode === "single" ? "multiple" : "single"
            }
        default :
            console.log("[Reducer] Action was unhandled: " + JSON.stringify(action));
            return state;
    }
}

export default reducer;
