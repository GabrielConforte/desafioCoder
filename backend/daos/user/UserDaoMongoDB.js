const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB.js");


class UsuarioDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super("Usuario", {
            nombre: {type: String, required: true},
            email: {type: String, required: true, unique: true},
            password: {type: String, required: true},
            rol: {type: String, required: true},
            });
        }
        
        comprobar(nombre, email) {
        return this.collection.findOne({nombre: nombre, email: email}).then(usuario => {
            if (usuario !== null) {
                return true;
            } else {
                return false;
            }
    }
    )
    }
        getUserByEmail(email) {
        return this.collection.findOne({email: email}).then(usuario => {
            if (usuario !== null) {
                return usuario;
            } else {
                return null;
            }
    }
    )


    }

}


    module.exports = UsuarioDaoMongoDB;