const Fs = require("fs");
const Http = require("http");
//const Path = require("path");
//console.log(Path.resolve("./"));

const server = Http.createServer((peticion, responder) => {
  //   responder.write("hola");
  //   responder.end();
  /**
   * Leyendo archivo de lista
   */
  Fs.readFile(
    "./server/recursos/listaProductos.json",
    "utf-8",
    (errorLectura, archivoLeido) => {
      if (errorLectura) {
        console.error(errorLectura);
        return;
      }
      const listaProductos = JSON.parse(archivoLeido);
      responder.write(JSON.stringify(listaProductos, null, 2));
      responder.end();
      //ejemplo de guardado
      // Fs.writeFile(
      //   "./server/recursos/resultado.json",
      //   JSON.stringify(listaProductos, null, 2),
      //   (errorEscritura, archivoEscrito) => {
      //     if (errorEscritura) {
      //       console.error(errorEscritura);
      //       return;
      //     }
      //     console.log(archivoEscrito);
      //   }
      // );
    }
  );
});
server.listen(5000);
