
let productosDao;
let carritosDao;
let isAdmin;
let userDao;
let {persistence_type} = require('../config');
let baseType = persistence_type || 'mongodb';

switch (baseType) {
	case "files":
		break;
	case "mongodb":
		const ProductosDaoMongoDB = require("./productos/ProductosDaoMongoDB.js");
		const CarritosDaoMongoDB = require("./carritos/CarritosDaoMongoDB.js");
		const UserDaoMongoDB = require("./user/UserDaoMongoDB.js");
		const AdminDaoMongoDB = require("./user/AdminDaoMongoDB.js");
		productosDao = new ProductosDaoMongoDB();
		carritosDao = new CarritosDaoMongoDB();
		userDao = new UserDaoMongoDB();
		isAdmin = new AdminDaoMongoDB();
		break;
	case "firebase":
		break;

	default:
		break;
}

module.exports = {productosDao, carritosDao, userDao, isAdmin};