import { createSlice } from '@reduxjs/toolkit';

const recipientSlice = createSlice({
  name: 'recipient',
  initialState: {
    recipient: "",
  },
  reducers: {
    setRecipient: (state, action) => {
      state.recipient = action.payload;
    },
    // You can define other actions for your recipient state here if needed.
  },
});

export const { setRecipient } = recipientSlice.actions;
export default recipientSlice.reducer;
