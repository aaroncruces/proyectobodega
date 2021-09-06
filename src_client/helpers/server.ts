import Product from "../../src_server/types/Product";
import { HttpStatusCode } from "../../src_server/types/HttpStatusCode";
import { InsertErrors } from "../../src_server/types/InsertErrors";
import { delay } from "./delay";

//To diferentiate between devel and prod
//@ts-ignore
const url = WP_URL;
const delay_amount = 2000;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(url + "/api/productos", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-type": "application/json",
      },
    });
    const productList = await response.json();
    let errorMessage = "";
    //@ts-ignore
    if (WP_URL) await delay(delay_amount);

    if (response.status == HttpStatusCode.OK) {
      return productList;
    }
    //todo: differentiate between httpStatusCodes
    errorMessage = "Ha habido un error en el servidor, Productos no obtenidos.";
    throw errorMessage;
  } catch (error) {
    throw "Ha habido un error";
  }
};

export const postProduct = async (producto: Product) => {
  //intento ingresar el producto
  const response = await fetch(url + "/api/ingreso", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  const datos_error = await response.json();

  //@ts-ignore
  if (WP_URL) await delay(delay_amount);

  if (response.status == HttpStatusCode.CREATED) {
    return;
  }
  //todo: differentiate between httpStatusCodes
  throw "Ha habido un error en el servidor, Producto no ingresado.";
};

export const patchProduct = async (sku: string, keyValuePair: object) => {
  const response = await fetch(url + "/api/modify_product_parameter", {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      sku,
      keyValuePair,
    }),
  });
  const datos_error = await response.json();

  //@ts-ignore
  if (WP_URL) await delay(delay_amount);

  if (response.status == HttpStatusCode.CREATED) {
    return;
  }
  //todo: differentiate between httpStatusCodes
  throw "Ha habido un error en el servidor, Producto no actualizado.";
};
