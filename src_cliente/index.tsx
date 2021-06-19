import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Paginas Ruteadas
import Ingreso_Producto from "./componentes/Ingreso_Producto";
import Modificacion_Producto from "./componentes/Modificacion_Producto";
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
    <>
      <Modificacion_Producto />
    </>
  );
};
ReactDOM.render(<APP />, document.getElementById("root"));
