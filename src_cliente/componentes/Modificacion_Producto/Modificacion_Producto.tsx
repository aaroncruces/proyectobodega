//vendors
import React, { Component, useEffect, useState } from "react";
import { Provider } from "react-redux";

import replace from "voca/replace";
import capitalize from "voca/capitalize";
import upperCase from "voca/upper_case";
import lowerCase from "voca/lower_case";
import trim from "voca/trim";
import * as currency from "currency.js";

//customs
import "../../styles.scss";
import { obtener_lista_productos } from "../../server";
import { Errores_ingreso } from "../../../src_servidor/tipos/Errores_ingreso";
import Producto from "../../../src_servidor/tipos/Producto";
import Datalist from "./Datalist";

export default class Modificacion_Producto extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>holamundo</h1>
      </Provider>
    );
  }
}
