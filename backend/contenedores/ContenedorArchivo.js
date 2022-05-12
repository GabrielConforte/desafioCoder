const {promises} = require("fs");
const fs = promises;
const {file} = require("../config/index");

 class ContenedorArchivos {
	constructor(route) {
		this.route = `${file.path}/${route}`;
	}
	
	async getAll() {
		try {
			const data = await fs.readFile(this.route, "utf-8");
			return JSON.parse(data);
		} catch (error) {
			console.log("No se puede leer");
		}
	}

	async editById(id, objeto) {
		try {
			const data = await this.getAll();
			if (data) {
				let obj = data.filter((element) => element.id == id);
				obj[0] = objeto;
				await fs.writeFile(this.route, JSON.stringify(data));
				return obj[0];
			}
		} catch (error) {
			console.log("No se puede leer archivo");
		}
	}

	async getById(id) {
		try {
			const data = await this.getAll();
			if (data) {
				let obj = data.find((element) => element.id == id);
				if (obj) return obj;
				return null;
			}
		} catch (error) {
			console.log("No se puede leer archivo");
		}
	}

	async save(objeto) {
        try{
            let contenedor = await this.getAll();
            const max = contenedor.reduce((a,b) => a.id > b.id ? a:b, {id: 0} )
                objeto.id = max.id + 1;
                objeto.timestamp = new Date()
                contenedor.push(objeto);
				console.log(contenedor)
            let json = JSON.stringify(contenedor);
            await fs.writeFile(this.route, json);
                return objeto.id;
        }catch(error){
            console.log(error);
        }
    
	}

	async deleteById(id) {
        let contenedor = await this.getAll();
        let objeto = contenedor.find(obj => obj.id == id);
        contenedor = contenedor.filter(obj => obj.id != id);
        if(objeto!=undefined){
            let json = JSON.stringify(contenedor);
            fs.writeFile(this.route, json);
            console.log('objeto eliminado');}
        else{
            console.log('no existe el objeto');
        }
    }

	async deleteAll() {
        await fs.writeFile(this.route, '[]');
        console.log('todos los objetos fueron eliminados');
    }

	async update(id, objeto) {
        let contenedor = await this.getAll();
        let objetoActualizado = contenedor.find(obj => obj.id == id);
        if(objetoActualizado!=undefined){
            objetoActualizado.title = objeto.title;
            objetoActualizado.price = objeto.price;
            objetoActualizado.description = objeto.description;
            objetoActualizado.thumbnail = objeto.thumbnail;
            objetoActualizado.stock= objeto.stock;
            objetoActualizado.codigo= objeto.codigo;
            let json = JSON.stringify(contenedor);
            fs.writeFile(this.route, json);
            console.log('objeto actualizado');
        }
        else{
            console.log('no existe el objeto');
        }
    }
}

module.exports = ContenedorArchivos;