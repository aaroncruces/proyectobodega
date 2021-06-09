const Fs = require("fs");

const rutaLista = "./server/recursos/listaProductos.json";
const encoding = "utf8";

const asincrono = async () => {
  const arrayobjetolista = await Fs.promises.readFile(rutaLista, encoding);
  console.log(arrayobjetolista);
};
asincrono();
