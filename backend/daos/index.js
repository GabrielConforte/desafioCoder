
let productosDao;
let carritosDao;
let userDao;
let baseType = "mongodb";

switch (baseType) {
	case "files":
		break;
	case "mongodb":
		const ProductosDaoMongoDB = require("./productos/ProductosDaoMongoDB.js");
		const CarritosDaoMongoDB = require("./carritos/CarritosDaoMongoDB.js");
		const UserDaoMongoDB = require("./user/UserDaoMongoDB.js");
		productosDao = new ProductosDaoMongoDB();
		carritosDao = new CarritosDaoMongoDB();
		userDao = new UserDaoMongoDB();
		break;
	case "firebase":
		break;

	default:
		break;
}

module.exports = {productosDao, carritosDao, userDao};