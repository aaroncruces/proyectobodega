import Producto from "../../src_server/types/Producto";
import { HttpStatusCode } from "../../src_server/types/HttpStatusCode";
import { Errores_ingreso } from "../../src_server/types/Errores_ingreso";

//Webpack dev or prod
//@ts-ignore
const url = WP_URL || "";

export const postProducto = async (
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

  if (respuesta.status == HttpStatusCode.CREATED) {
    exito = true;
  }

  if (respuesta.status == HttpStatusCode.CONFLICT) {
    exito = false;
    codigo_error = datos_error.codigo_error;

    if (datos_error.codigo_error == Errores_ingreso.PRODUCTO_NO_EXISTE)
      mensaje = "El producto no se ha ingresado.";

    if (datos_error.codigo_error == Errores_ingreso.SKU_VACIA)
      mensaje = "Ingrese SKU.";

    if (datos_error.codigo_error == Errores_ingreso.MODELO_VACIO)
      mensaje = "El producto no se ha ingresado";

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

    if (datos_error.codigo_error == Errores_ingreso.MODELO_MARCA_REPETIDA) {
      mensaje = "El producto con modelo: '" + datos_error.producto.modelo + "'";
      if (datos_error.producto.marca != "")
        mensaje += ", y marca: '" + datos_error.producto.marca + "'";
      mensaje +=
        " ya existe. Se trata del producto con SKU: '" +
        datos_error.producto.sku +
        "'.";
    }

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
  }

  if (respuesta.status == HttpStatusCode.INTERNAL_SERVER_ERROR) {
    exito = false;
    mensaje = "Hubo un error de servidor. Contactese con soporte.";
  }

  //@ts-ignore
  if (WP_URL) await delay(5000);
  return { exito, mensaje, codigo_error };
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchProductos = async (): Promise<Producto[]> => {
  const respuesta = await fetch(url + "/api/productos", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json",
    },
  });
  //@ts-ignore
  if (WP_URL) await delay(5000);

  const lista_productos = await respuesta.json();
  return lista_productos;
};
