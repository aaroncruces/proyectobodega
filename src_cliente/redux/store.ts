import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
//@ts-ignore, dice que no es un modulo
import logger from "redux-logger";
// Necesario para la verificacion de la validez de los inputboxes y otros.
// Tambien para asyncs
import thunk from "redux-thunk";
const store = createStore(
  rootReducer,
  applyMiddleware(
    // logger,
    thunk
  )
);
export default store;
