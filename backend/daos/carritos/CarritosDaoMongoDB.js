const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB.js");

class CarritosDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("carritos", {
			timestamps: {type: Date},
			items: {},
		});
	}

async addProducto(id, producto){
	try {
		let carritoTemporal = await this.collection.findOne({
			id: id
		});
		carritoTemporal.items.push(producto[0]);
		let objeto = await this.collection.updateOne({
			code: id
		}, {
			$set: {
				items: carritoTemporal.items
			}
		});
		return objeto;
	}
	catch (error) {
		console.log(error);
	}
}

async getAllById(id){
	try {
		let objeto = await this.collection.findOne({
			code: id
		});
		return objeto;
	}
	catch (error) {
		console.log(error);
	}
}

async deleteProducto(id, producto){
	try {
		let carritoTemporal = await this.collection.findOne({
			code: id
		});
		let productoTemporal = carritoTemporal.items.find(item => item.code == producto);
		carritoTemporal.items.splice(carritoTemporal.items.indexOf(productoTemporal), 1);
		let objeto = await this.collection.updateOne({
			code: id
		}, {
			$set: {
				items: carritoTemporal.items
			}
		});
	
		
		return objeto;
	}
	catch (error) {
		console.log(error);
	}
}

	async deleteAllbyId(id){
		try {
			let objeto = await this.collection.deleteOne({
				id: id
			});
			return objeto;
		}
		catch (error) {
			console.log(error);
		}
	}

}

module.exports = CarritosDaoMongoDB;