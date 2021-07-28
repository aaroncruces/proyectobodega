/**
 * todo: to->english+locale
 * Para compilacion rapida, se usa la opcion -T en ts-script descrita en nodemon.json
 * Para enforcing y aviso de errores, quitar -T
 */
import { ingresar_producto, obtener_lista_productos } from "./model/database";
import express from "express";
const app = express();
import path from "path";
import { InsertErrors } from "./types/InsertErrors";
import { HttpStatusCode } from "./types/HttpStatusCode";

const Cors = require("cors");

/**
 * carpeta de recursos y cosas
 * entrega index.html en ruta "/"
 */
app.use(express.static(path.resolve(__dirname, "../dist_client")));

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
      const producto = req.body;
      await ingresar_producto(producto);
      res.status(HttpStatusCode.CREATED).send({});
    } catch (error) {
      if (
        !error.codigo_error ||
        error.codigo_error == InsertErrors.OTRO_ERROR
      ) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      } else {
        res.status(HttpStatusCode.CONFLICT);
      }
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
  console.log("escuchando en 5k");
});
