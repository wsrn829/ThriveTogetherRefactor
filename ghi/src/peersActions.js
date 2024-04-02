// Action Types
export const GET_PEERS_START = "GET_PEERS_START";
export const GET_PEERS_SUCCESS = "GET_PEERS_SUCCESS";
export const GET_PEERS_FAILURE = "GET_PEERS_FAILURE";
export const SET_PEERS = "SET_PEERS";

// Action Creators
export const getPeersStart = () => ({
  type: GET_PEERS_START,
});

export const getPeersSuccess = (peers) => ({
  type: GET_PEERS_SUCCESS,
  payload: peers,
});

export const getPeersFailure = (error) => ({
  type: GET_PEERS_FAILURE,
  payload: error,
});

export const setPeers = (peers) => ({
  type: SET_PEERS,
  payload: peers,
});

export const fetchPeers = () => async (dispatch) => {
  dispatch(getPeersStart());
  try {
    const url = `${process.env.REACT_APP_API_HOST}/api/peers`;
    const response = await fetch(url, {
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(getPeersSuccess(data));
    } else {
      throw new Error("Peer data could not be fetched");
    }
  } catch (error) {
    dispatch(getPeersFailure(error.toString()));
  }
};
