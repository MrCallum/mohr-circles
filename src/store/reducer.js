const initialState = {
    circleWidthHeight : 100,
    padding : 25
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
        default :
            console.log("[Reducer] Action recieved: " + action);
            return state;
    }
}

export default reducer;
