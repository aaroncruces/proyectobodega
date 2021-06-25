import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const rootReducer = () => [];
const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  //@ts-ignore
  initialState,
  applyMiddleware(...middleware)
);
export default store;
