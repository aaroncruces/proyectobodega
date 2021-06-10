const Express = require("express");
const App = Express();
const Path = require("path");

const productos = [
  {
    id: 1,
    codigo: "123",
    nombre: "Tornillo",
    descripcion: "este un tornillo",
    precioBruto: 4000,
    cantidad: 30,
  },
  {
    id: 2,
    codigo: "1234",
    nombre: "clavo",
    descripcion: "este un clavo",
    precioBruto: 555,
    cantidad: 3,
  },
];

/**
 * carpeta de recursos y cosas
 * entrega index.html en ruta "/"
 */
App.use(Express.static(Path.resolve(__dirname, "../html_testing")));

App.get("/api/productos", (req, res) => {
  res.json(productos);
});
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.put("/post/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send("post:");
});

App.listen(5000);
