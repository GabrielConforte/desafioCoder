
const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB.js");

class ProductosDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("producto", {
			title: {type: String, required: true},
			description: {type: String, required: true},
			code: {type: Number, required: true, unique: true, min: 0},
			thumbnail: {type: String, required: true},
			price: {type: Number, required: true, min: 0},
			stock: {type: Number, required: true},
			timestamps: {type: Date},
		});
	}
}

module.exports = ProductosDaoMongoDB;