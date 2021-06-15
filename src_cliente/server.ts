/**
 * esta cosa actua como interfaz para obtener y guardar los datos
 * en una base de datos local, archivo de texto, lan, etc
 */

import lista from "./listaProductos";
import Producto from "./Producto";

const url = "http://localhost:5000";

export const getListaProductos = async (): Promise<Producto[]> => {
  return lista;
};

export const enviarProducto = async (producto: Producto) => {
  console.log("enviando...");
  console.log(producto);
  fetch(url + "/api/ingreso", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json",
      //,"Content-type":"application/x-www-form-urlencoded"
    },
    body: JSON.stringify(producto),
  }).then((res) => {
    console.log("Request complete! response:", res);
  });
};
