import "bootstrap";
import ReactDOM from "react-dom";
import React from "react";
import Form_Create_Product from "./components/Form_Create_Product";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
//estilos+custom
import "./styling/styles.scss";
import Form_Modify_Product from "./components/Form_Modify_Product";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//todo: to->english+locale

const APP = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <h1>HOME</h1>
          </Route>
          <Route path="/crear_producto" exact component={Form_Create_Product} />
          <Route
            path="/modificar_producto"
            exact
            component={Form_Modify_Product}
          />
        </Switch>
      </Router>
    </Provider>
  );
};
ReactDOM.render(<APP />, document.getElementById("root"));
