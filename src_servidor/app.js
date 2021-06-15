const Database = require("./modelo/database");
const Express = require("express");
const App = Express();
const Path = require("path");
const Cors = require("cors");

/**
 * carpeta de recursos y cosas
 * entrega index.html en ruta "/"
 */
App.use(Express.static(Path.resolve(__dirname, "../dist")));

//TODO: investigar sobre cors
App.use(
  Cors({
    "Access-Control-Allow-Origin": "*",
  })
);

App.get("/api/productos", (req, res) => {
  //res.json(productos);
});

//App.use(Express.urlencoded({ extended: false }));
//TODO: investigar opciones
App.use(Express.json());

App.post("/api/ingreso", async (req, res) => {
  //console.log(req.params);
  const producto = req.body;
  //

  // const respuesta = {
  //   ingreso_exitoso: false,
  //   sku_repetida: false,
  //   marca_repetida: false,
  //   error_base_datos: false,
  //   error_servidor: false,
  //   otro_error: false,
  // };
  //respuesta["tipo-error"]["error-base-datos"]
  await Database.ingresar_producto(producto);

  res.status(200).end();
});

App.listen(5000);
