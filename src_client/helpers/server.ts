import Product from "../../src_server/types/Product";
import { HttpStatusCode } from "../../src_server/types/HttpStatusCode";
import { InsertErrors } from "../../src_server/types/InsertErrors";
import { delay } from "./delay";

//To diferentiate between devel and prod
//@ts-ignore
const url = WP_URL;
const delay_amount = 3000;

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
    errorMessage = "Ha habido un error en el servidor";
    throw errorMessage;
  } catch (error) {
    throw "Ha habido un error";
  }
};

export const postProduct = async (
  producto: Product
): Promise<{ success: boolean; message: string }> => {
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

  if (response.status == HttpStatusCode.CREATED) {
    return { success: true, message: "Producto ingresado con exito" };
  }
  const failureMessage = "Producto no ingresado";
  //@ts-ignore
  if (WP_URL) await delay(5000);
  return { success: false, message: failureMessage };
};

export const patchProduct = async (
  sku: string,
  keyValuePair: object
): Promise<object> => {
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

  return {};
};
