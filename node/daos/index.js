
let productosDao;
let carritosDao;
let baseType = "mongodb";

switch (baseType) {
	case "files":
		const ProductosDaoArchivo = require("./productos/ProductosDaoArchivo");
		const CarritosDaoArchivo = require("./carritos/CarritosDaoArchivo");
		productosDao = new ProductosDaoArchivo();
		carritosDao = new CarritosDaoArchivo();
		break;
	case "mongodb":
		const ProductosDaoMongoDB = require("./productos/ProductosDaoMongoDB.js");
		const CarritosDaoMongoDB = require("./carritos/CarritosDaoMongoDB.js");
		productosDao = new ProductosDaoMongoDB();
		carritosDao = new CarritosDaoMongoDB();
		break;
	case "firebase":
		const {default: ProductsDaoFirebase} = import("./productos/ProductosDaoFirebase.js");
		const {default: CartsDaoFirebase} = import("./carritos/CarritosDaoFirebase.js");
		productosDao = new ProductosDaoFirebase();
		carritosDao = new CarritosDaoFirebase();
		break;

	default:
		break;
}

module.exports = {productosDao, carritosDao};