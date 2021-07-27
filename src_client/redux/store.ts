import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
const store = createStore(
  rootReducer,
  applyMiddleware(
    // logger,
    thunk
  )
);
export default store;
