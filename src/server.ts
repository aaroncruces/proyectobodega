/**
 * esta cosa actua como interfaz para obtener y guardar los datos
 * en una base de datos local, archivo de texto, lan, etc
 */

import lista from "./listaProductos";
import Producto from "./Producto";

// const urlReadListaProductos = "http://localhost:5000/api/productos";
// /**
//  * para obtener Productos
//  */
// export const getListaProductos = async (): Promise<Producto[]> => {
//   const respuesta = await fetch(urlReadListaProductos);
//   const listaProductos = await respuesta.json();
//   console.log(listaProductos);
//   // @ts-ignore. No se como hacerlo aun
//   return listaProductos;
// };
export const getListaProductos = async (): Promise<Producto[]> => {
  return lista;
};
