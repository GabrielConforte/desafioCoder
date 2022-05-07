const {promises} = require("fs");
const fs = promises;

const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class CarritosDaoArchivo extends ContenedorArchivo {
	constructor() {
		super("carts.txt");
	}

	async addProducto(id, producto) {
		try{
			let listaCarritos = await this.getAll();
			let objeto = listaCarritos.find(obj => obj.id == id);
			producto.codigo = new Date().getTime();
			if(objeto!=undefined){
				objeto.items.push(producto);
				let json = JSON.stringify(listaCarritos);
				await fs.writeFile(this.route, json);
				return objeto.title;
		}}catch(error){
			console.log("No se pudo agregar el producto");
		}
		
	}
	async deleteProducto(id, productoId) {
		try {
		let listaCarritos = await this.getAll();
		let objeto = listaCarritos.find(obj => obj.id == id);
		if(objeto!=undefined){
			objeto.items = objeto.items.filter(item => item.id != productoId);
			let json = JSON.stringify(listaCarritos);
			await fs.writeFile(this.route, json);
		}
		} catch (error) {
			console.log("no se pudo eliminar el producto");
		}
	}  
	
	async getAllById(id) {
		try {
			const cart = await this.getAll();
			let cartFind = cart.filter((element) => element.id == id);
			return cartFind
		} catch (error) {
			console.log("no se pudo encontrar el carrito");
		}
	}
}

module.exports = CarritosDaoArchivo ;