/**
 * Para compilacion rapida, se usa la opcion -T en ts-script descrita en nodemon.json
 * Para enforcing y aviso de errores, quitar -T
 */
import { ingresar_producto, obtener_lista_productos } from "./modelo/database";
import express from "express";
const app = express();
import path from "path";
import { Errores_ingreso } from "./tipos/Errores_ingreso"; //llaves necesarios debido al error de export default enum
import { HttpStatusCode } from "./tipos/HttpStatusCode"; //llaves necesarios debido al error de export default enum

const Cors = require("cors");

/**
 * carpeta de recursos y cosas
 * entrega index.html en ruta "/"
 */
app.use(express.static(path.resolve(__dirname, "../dist_cliente")));

//TODO: investigar sobre cors
app.use(
  Cors({
    "Access-Control-Allow-Origin": "*",
  })
);

//app.use(express.urlencoded({ extended: false }));
//TODO: investigar opciones
// @ts-ignore
app.use(express.json());

app.post(
  "/api/ingreso",
  async (req: express.Request, res: express.Response) => {
    try {
      //producto que intento ingresar
      const producto = req.body;
      //ingreso del producto
      await ingresar_producto(producto);
      //cada objeto de respuesta debe tener un cuerpo json
      res.status(HttpStatusCode.CREATED).send({});
    } catch (error) {
      // en caso de que el error sea del servidor
      if (
        !error.codigo_error ||
        error.codigo_error == Errores_ingreso.OTRO_ERROR
      ) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      //si es debido al ciente
      else {
        res.status(HttpStatusCode.CONFLICT);
      }
      // Por ultimo, mando el error (que puede ser de cualquier tipo, y puede tener los motivos)
      // por ejemplo:
      // { codigo_error: Errores_ingreso.MODELO_MARCA_REPETIDA,
      //   producto: producto_modelo_marca_encontrada,          }
      res.setHeader("Content-Type", "application/json").json(error);
    }
  }
);

app.get(
  "/api/productos",
  async (req: express.Request, res: express.Response) => {
    try {
      const lista_productos = await obtener_lista_productos();
      if (!lista_productos || lista_productos.length == 0) {
        res.status(HttpStatusCode.NOT_FOUND);
      } else {
        res.status(HttpStatusCode.OK);
      }

      res.setHeader("Content-Type", "application/json").json(lista_productos);
    } catch (error) {
      res
        .setHeader("Content-Type", "application/json")
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send();
    }
  }
);

app.listen(5000, () => {
  console.log("escuchando en 80");
});
