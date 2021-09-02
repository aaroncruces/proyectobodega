import {
  ingresar_producto,
  modify_product_parameter,
  obtener_lista_productos,
} from "./model/database";
import express from "express";
const app = express();
import path from "path";
import { InsertErrors } from "./types/InsertErrors";
import { HttpStatusCode } from "./types/HttpStatusCode";

const Cors = require("cors");

app.use(express.static(path.resolve(__dirname, "../dist_client")));

app.use(
  Cors({
    "Access-Control-Allow-Origin": "*",
  })
);

// @ts-ignore
app.use(express.json());

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

app.patch(
  "/api/modify_product_parameter",
  async (req: express.Request, res: express.Response) => {
    try {
      await modify_product_parameter(req.body.sku, req.body.keyValuePair);
      res.status(HttpStatusCode.CREATED).send({});
    } catch (error) {
      console.error(error);
      res.status(HttpStatusCode.I_AM_A_TEAPOT);
      res.setHeader("Content-Type", "application/json").json(error);
    }
  }
);

app.listen(5000, () => {
  console.log("escuchando en 5k");
});
