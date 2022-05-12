const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class ProductosDaoArchivo extends ContenedorArchivo {
	constructor() {
		super("products.txt");
	}
}

module.exports = ProductosDaoArchivo;