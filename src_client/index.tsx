import ReactDOM from "react-dom";
import React from "react";
import Form_Create_Product from "./components/Form_Create_Product";
import { Provider } from "react-redux";
import store from "./redux/store";
//estilos+custom
import "./styling/styles.scss";
import Form_Modify_Product from "./components/Form_Modify_Product";
//todo: to->english+locale

//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/*
      <Router>
        <Route exact path="/">
          <a href="/ingreso_producto">ingreso_producto</a>
          <a href="/modificacion_producto">modificacion_producto</a>
        </Route>
        <Route path="/ingreso_producto">
          <Form_Create_Product /> />
        </Route>
        <Route path="/modificacion_producto">
          <Form_Modify_Product />
        </Route>
      </Router>
*/

const APP = () => {
  return (
    <Provider store={store}>
      <Form_Create_Product />
    </Provider>
  );
};
ReactDOM.render(<APP />, document.getElementById("root"));
