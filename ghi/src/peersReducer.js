const initialState = {
  peers: [],
  status: "idle",
  error: null,
};

const peersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PEERS_START":
      return {
        ...state,
        status: "loading",
      };
    case "GET_PEERS_SUCCESS":
      return {
        ...state,
        status: "succeeded",
        peers: action.payload.peers,
      };
    case "GET_PEERS_FAILURE":
      return {
        ...state,
        status: "failed",
        error: action.payload.error,
      };
    case "SET_PEERS":
      return {
        ...state,
        recipient: action.payload.peers,
      };
    default:
      return state;
  }
};

export default peersReducer;
