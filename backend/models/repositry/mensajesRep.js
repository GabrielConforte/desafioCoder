const ContenedorMongoDb = require("../../models/ContenedorMongoDb");

class MensajesRep extends ContenedorMongoDb {
    constructor() {
        super("mensajes", {
            idUsuario: {type: String, required: true},
            mensajesEnv: [{
                fecha: {type: Date, required: true},
                mensaje: {type: String, required: true},
            }],
        });
    }
    async addMensaje(idUsuario, mensaje) {
        try {
            //busca en la base si existe un repositorio de mensajes con ese id
            //si no existe lo crea
            let mensajes = await this.collection.findOne({idUsuario: idUsuario });
            if (!mensajes) {
                mensajes = await this.collection.create({idUsuario: idUsuario});
            }
            //agrega el mensaje al repositorio
            mensajes.mensajesEnv.push({
                fecha: new Date(),
                mensaje: mensaje,
            });
            //guarda el repositorio en la base de datos
            await mensajes.save();

        } catch (error) {
            console.log(error);
        }
    }


    async getMensajes(idUsuario) {
        try {
           //busca en la base si existe un repositorio de mensajes con ese id
              //si no existe lo crea
            let mensajes = await this.collection.findOne({idUsuario: idUsuario });
            //envia solo los mensajes bajo el campo mensajesEnv
            
            if (!mensajes) {
                mensajes = await this.collection.create({idUsuario: idUsuario});
            }
            //guarda el repositorio en la base de datos
            mensajes = await this.collection.findOne({idUsuario: idUsuario});
            return mensajes.mensajesEnv;;

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new MensajesRep();