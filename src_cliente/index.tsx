import ReactDOM from "react-dom";
import React from "react";
import Formulario_Ingreso_Producto from "./components/Formulario_Ingreso_Producto";
import { Provider } from "react-redux";
import store from "./redux/store";
//estilos+custom
import "./styling/styles.scss";

//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/*
      <Router>
        <Route exact path="/">
          <a href="/ingreso_producto">ingreso_producto</a>
          <a href="/modificacion_producto">modificacion_producto</a>
        </Route>
        <Route path="/ingreso_producto">
          <Ingreso_Producto />
        </Route>
        <Route path="/modificacion_producto">
          <Modificacion_Producto />
        </Route>
      </Router>
*/

const APP = () => {
  return (
    <Provider store={store}>
      <Formulario_Ingreso_Producto />
    </Provider>
  );
};
ReactDOM.render(<APP />, document.getElementById("root"));
