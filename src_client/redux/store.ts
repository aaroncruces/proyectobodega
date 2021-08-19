import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(
      // logger,
      thunk
    )
  )
);
export default store;
