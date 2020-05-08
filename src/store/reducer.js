const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type){
        default :
            console.log("[Reducer] Action recieved: " + action);
            return state;
    }
}

export default reducer;
