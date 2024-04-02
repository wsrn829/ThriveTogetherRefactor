const initialState = {
    recipient: ''
};

const recipientReducer = (state = initialState, action) => {
    switch (action.type) {
    // Define different cases to handle actions

        case 'SET_RECIPIENT':
            return {
                ...state,
                recipient: action.payload.recipient,
            };
        default:
            return state;
    }
};

export default recipientReducer;
