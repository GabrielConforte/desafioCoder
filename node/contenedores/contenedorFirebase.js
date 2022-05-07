//hagamos un crud de firebase con todos los metodos que necesitamos, y que sean similares a los de mongo
//hagamos un crud de firebase con todos los metodos que necesitamos, y que sean similares a los de mongo

//importa los modulos necesarios
const logger = require('../config/loggers/pinoLog');

class ContenedorFirebase {
    constructor(collection) {
        this.collection = collection;
    }
    async getAll() {
        try {
            const data = await this.collection.get();
            return data.data();
        } catch (error) {
            logger.error("no se puede leer el archivo");
        }
    }
    async getById(id) {
        try {
            const data = await this.collection.doc(id).get();
            return data.data();
        } catch (error) {

            logger.error("no se pudo leer el archivo");
        }
    }
    async save(objeto) {
        try {
            await this.collection.add(objeto);
            return objeto.title;
        } catch (error) {
            //si sale error de duplicado evitar que se guarde
            if (error.code == 11000) {
                return "El objeto ya existe";
            }
            else {
                logger.error("no se puede guardar el archivo ->" + error);
            }
        }
    }
    async editById(id, obj) {
        try {
            const dataUpdate = await this.collection.doc(id).update(obj);
            return dataUpdate;
        } catch (error) {
            logger.error("no se puede editar");
        }
    }
    async delete(id) {
        try {
            logger.info(`se va a eliminar el id: ${id}`);
            const data = await this.collection.doc(id).delete();
            return data.data();
        } catch (error) {
            logger.error("no se puede eliminar");
        }
    }
    async add(data) {
        try {
            await this.collection.add(data);
            return data.title;
        } catch (error) {
            logger.error("no se puede guardar el archivo ->" + error);
        }
    }
}
module.exports = ContenedorFirebase;