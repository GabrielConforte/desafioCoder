const ContenedorMongoDB = require("../../ContenedorMongoDB.js");

class AdminDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super("Admin", {
            nombre: {type: String, required: true},
            email: {type: String, required: true, unique: true},
        });
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
module.exports = AdminDaoMongoDB;