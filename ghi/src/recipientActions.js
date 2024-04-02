// Action Types
export const SET_RECIPIENT = 'SET_RECIPIENT';
// export const UPDATE_RECIPIENT = 'UPDATE_RECIPIENT';

// Action Creator
export const setRecipient = (recipient) => ({
    type: 'SET_RECIPIENT',
    payload: recipient
})

// export const updateRecipient = (recipient) => ({
//     type: 'UPDATE_RECIPIENT',
//     payload: recipient
// })
