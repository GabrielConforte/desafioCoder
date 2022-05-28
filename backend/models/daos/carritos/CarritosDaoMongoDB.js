const ContenedorMongoDB = require("../../ContenedorMongoDB.js");

class CarritosDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("carritos", {
			user: {type: String},
			timestamps: {type: Date},
			items: {},
		});
	}

async addProducto(id, producto){
	try {
		let carritoTemporal = await this.collection.findOne({
			user: id
		});
		if(carritoTemporal === null || carritoTemporal === undefined){
			await this.addCarrito(id);
			carritoTemporal = await this.collection.findOne({
				user: id
			});
		}
		
		let productoTemporal = carritoTemporal.items.find(item => item.code == producto.code);
		if(productoTemporal){
			productoTemporal.cant++;
		}
		else{
			let productoTemporal = {
				code: producto.code,
				title: producto.title,
				price: producto.price,
				cant: 1,
			}
		carritoTemporal.items.push(productoTemporal);
		}
		let objeto = await this.collection.updateOne({
			user: id
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

async getAllById(data) {
	try {
		const cart = await this.collection.findOne({
			user: data
		});
		return cart;
	} catch (error) {
		logger.error("no se puede leer el archivo");
	}
}

async deleteProducto(id, producto){
	try {
		let carritoTemporal = await this.collection.findOne({
			user: id
		});
		let productoTemporal = carritoTemporal.items.find(item => item.code == producto);
		if(productoTemporal.cant > 1){
			productoTemporal.cant--;
		}
		else{
		carritoTemporal.items.splice(carritoTemporal.items.indexOf(productoTemporal), 1);
		let objeto = await this.collection.updateOne({
			user: id
		}, {
			$set: {
				items: carritoTemporal.items
			}
		});
	}
	
		
		return objeto;
	}
	catch (error) {
		console.log(error);
	}
}

	async deleteItems(id){
		try {
			let objeto = await this.collection.updateOne({
				user: id
			}, {
				$set: {
					items: []
				}
			});
			return objeto;
		}
		catch (error) {
			console.log(error);
		}
	}

	async addCarrito(data) {
		try {
			await this.collection({user: data, timestamps: new Date(), items: []} ).save();
		} catch (error) {
			logger.error("no se puede crear");
		}
	}

	async getByIdUser(data) {
		try {
			const cart = await this.collection.findOne({
				user: data
			});
			return cart;
		} catch (error) {
			logger.error("no se puede leer el archivo");
		}
	}
}

module.exports = CarritosDaoMongoDB;