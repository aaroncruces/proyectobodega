/**
 * para compilacion rapida, se usa la opcion -T en ts-script descrita en nodemon.json
 */
const Database = require("./modelo/database");
import express from "express";
const app = express();
import path from "path";

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

app.get("/api/productos", (req: Express.Request, res: Express.Response) => {
  //res.json(productos);
});

//App.use(Express.urlencoded({ extended: false }));
//TODO: investigar opciones
// @ts-ignore
app.use(express.json());

app.post(
  "/api/ingreso",
  async (req: express.Request, res: express.Response) => {
    //console.log(req.params);
    console.log("post");
    const producto = req.body;
    //

    // const respuesta = {
    //   ingreso_exitoso: 200,
    //   sku_repetida: false,
    //   marca_repetida: false,
    //   error_base_datos: false,
    //   error_servidor: false,
    //   otro_error: false,
    // };
    //respuesta["tipo-error"]["error-base-datos"]
    try {
      await Database.ingresar_producto(producto);
      res.status(200);
    } catch (error) {
      console.log(error);
    }
    res.end();
  }
);

app.listen(5000, () => console.log("escuchando"));
