import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  peers: [],
  status: "idle",
  error: null,
};

const peersSlice = createSlice({
  name: "peers",
  initialState,
  reducers: {
    getPeersStart: (state) => {
      state.status = "loading";
    },
    getPeersSuccess: (state, action) => {
      state.status = "succeeded";
      state.peers = action.payload;
    },
    getPeersFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setPeers: (state, action) => {
      state.peers = action.payload;
    },
  },
});

export const { getPeersStart, getPeersSuccess, getPeersFailure, setPeers } =
  peersSlice.actions;

export default peersSlice.reducer;
