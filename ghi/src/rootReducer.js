import { combineReducers } from "redux";
import recipientReducer from "./recipientReducer";
import peersReducer from "./peersSlice";

const rootReducer = combineReducers({
  recipient: recipientReducer,
  peers: peersReducer,
});

export default rootReducer;
