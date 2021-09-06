import "bootstrap/js/dist/alert";
import "bootstrap";
import ReactDOM from "react-dom";
import React from "react";
import Form_Create_Product from "./components/forms/Form_Create_Product";
import Form_Alter_Product_Parameters from "./components/forms/Form_Alter_Product_Parameters";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
//estilos+custom
import "./styling/styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form_Search_Modify_Product from "./components/forms/Form_Search_Modify_Product";

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
            component={Form_Search_Modify_Product}
          />
          <Route
            path="/alterar_parametros_producto"
            exact
            component={Form_Alter_Product_Parameters}
          />
        </Switch>
      </Router>
    </Provider>
  );
};
ReactDOM.render(<APP />, document.getElementById("root"));
