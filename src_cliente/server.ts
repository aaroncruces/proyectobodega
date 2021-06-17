/**
 * esta cosa actua como interfaz para obtener y guardar los datos
 * en una base de datos local, archivo de texto, lan, etc
 */

import Producto from "../src_servidor/tipos/Producto";
import { HttpStatusCode } from "../src_servidor/tipos/HttpStatusCode";
import { Errores_ingreso } from "../src_servidor/tipos/Errores_ingreso";

const url = "http://localhost:5000";

export const enviarProducto = async (
  producto: Producto
): Promise<{
  exito: boolean;
  mensaje: string;
  codigo_error: Errores_ingreso | undefined;
}> => {
  //intento ingresar el producto
  const respuesta = await fetch(url + "/api/ingreso", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  const datos_error = await respuesta.json();
  let mensaje = "";
  let exito = false;
  let codigo_error;

  // Producto ingresado correnctamente
  if (respuesta.status == HttpStatusCode.CREATED) {
    exito = true;
  }

  // si no puede ingresar datos debido a el mismo usuario
  if (respuesta.status == HttpStatusCode.CONFLICT) {
    exito = false;
    codigo_error = datos_error.codigo_error;
    // Dada la comprejidad de la combinacion de condiciones 3 y 4,
    // no puedo utilizar el manejo de errores de mongo/mongoose,
    // asi que los chequeos se harán manualmente.

    // ! en condiciones normales, los errores 0,1,2 no deberian gatillarse
    // ! se manejan en caso de haber error del programador

    // 0) el producto debe existir
    if (datos_error.codigo_error == Errores_ingreso.PRODUCTO_NO_EXISTE)
      mensaje = "El producto no se ha ingresado.";

    // 1) sku debe estar presente, no ser ""
    if (datos_error.codigo_error == Errores_ingreso.SKU_VACIA)
      mensaje = "Ingrese SKU.";

    // 2) modelo debe estar presente, no ser ""
    if (datos_error.codigo_error == Errores_ingreso.MODELO_VACIO)
      mensaje = "El producto no se ha ingresado";

    // 3) sku debe ser unico, no existir en la base de datos.
    //    en caso de existir, indicar el nombre+marca del producto al que pertenece
    // en principio, deberia tener obligadamente sku y modelo (debido a las restricciones)
    // todo: igual validar que reciba estos datos
    if (datos_error.codigo_error == Errores_ingreso.SKU_REPETIDA) {
      mensaje =
        "El producto con la SKU: '" + datos_error.producto.sku + "' ya existe";
      mensaje +=
        ". Se trata del producto con modelo: '" +
        datos_error.producto.modelo +
        "'";
      if (datos_error.producto.marca != "")
        mensaje += "; y marca: '" + datos_error.producto.marca + "'";
      mensaje += ".";
    }

    // 4) la combinacion de modelo+marca debe ser unica
    //    idem caso 3 (con sku)
    // todo: idem caso 3
    if (datos_error.codigo_error == Errores_ingreso.MODELO_MARCA_REPETIDA) {
      mensaje = "El producto con modelo: '" + datos_error.producto.modelo + "'";
      if (datos_error.producto.marca != "")
        mensaje += ", y marca: '" + datos_error.producto.marca + "'";
      mensaje +=
        " ya existe. Se trata del producto con SKU: '" +
        datos_error.producto.sku +
        "'.";
    }

    // 5) el codigo de barras puede ser vacio, pero si no, debe ser unico
    if (
      datos_error.codigo_error ==
      Errores_ingreso.CODIGO_BARRAS_NO_VACIO_REPETIDO
    ) {
      mensaje =
        "El producto con la el codigo de barras: '" +
        datos_error.producto.codigo_barras +
        "' ya existe";
      mensaje +=
        ". Se trata del producto con modelo: '" +
        datos_error.producto.modelo +
        "'";
      if (datos_error.producto.marca != "")
        mensaje += "; y marca: '" + datos_error.producto.marca + "'";
      mensaje += ".";
    }
  } //end if (respuesta.status == HttpStatusCode.CONFLICT)

  // Otro error, o error del servidor
  if (respuesta.status == HttpStatusCode.INTERNAL_SERVER_ERROR) {
    exito = false;
    mensaje = "Hubo un error de servidor. Contactese con soporte.";
  }

  return Promise.resolve({ exito, mensaje, codigo_error });
};
