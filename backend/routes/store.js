const express = require('express');
const routes = express.Router();
const {productosDao} = require("../models/daos/index");
const {carritosDao} = require("../models/daos/index");
const isAdmin = true
const logger = require('../config/loggers/pinoLog');
const transporter = require("../config/mailer/mailer");
const {mailer} = require("../config/index");

const error403 = {
    status: 403,
    message: 'No tienes permisos para realizar esta acción'
};

//rutas para el listado de productos
routes.get('/productos/:id', async (req, res) => {
        try {
            let objeto = await productosDao.getById(req.params.id);
            if (objeto != undefined) {
                res.json(objeto);
                }
                else {
                    res.json('no existe el objeto');
                }
    }
    catch (error) {
        logger.error(error);
    }
});

routes.post('/productos', async (req, res) => {
    if(isAdmin){
        try {
        let objeto = await productosDao.save(req.body);
        if (objeto != 'El objeto ya existe') {
        res.json(objeto + " fue guardado");}
        else {
            res.json(objeto);
        }
    }
    catch (error) {
    }
    }
    else{
        res.json(error403);
    }
    
});

routes.delete('/productos/:id', async (req, res) => {
    if(isAdmin){
    try {
        let objeto = await productosDao.delete(req.params.id);
        res.json(objeto +" eliminado");
    }
    catch (error) {
        logger.error(error);
    }
    }else{
        res.json(error403);
    }
});

routes.put('/productos/:id', async (req, res) => {
    if(isAdmin){
    try {
        await productosDao.update(req.params.id, req.body);
        console.log(req.params.id);
        res.json("objeto actualizado");
    }
    catch (error) {
        logger.error(error);
    }
    }else{
        res.json(error403);
    }
});

routes.get('/productos', async (req, res) => {
    try {
        let objeto = await productosDao.getAll();
        res.json(objeto);
        }
        catch (error) {
            logger.error(error);
            }
            });

 //***************************************************************************************************//
//rutas para carrito

routes.get('/carrito/:id', async (req, res) => {
    try {
        let objeto = await carritosDao.getByIdUser(req.params.id);
        if (objeto != undefined) {
            res.json(objeto);
            }
            else {
                let objeto = await carritosDao.addCarrito(req.params.id);
                res.json(objeto);
            }
    }
    catch (error) {
        logger.error(error);
    }
});

routes.post("/carrito/:id", async (req, res) => {
    try {
        let carrito = await carritosDao.addCarrito(req.params.id);
        res.send(carrito);
    } catch (error) {
        res.send(error);
    };
});

routes.delete('/carrito/:id', async (req, res) => {
    try {
        let objeto = await carritosDao.deleteItems(req.params.id);
        res.json(objeto);
        }
        catch (error) {
            logger.error(error);
            }
            });

routes.get('/carrito/:id/productos', async (req, res) => {
    try {
        let objeto = await carritosDao.getAllById(req.params.id);
        res.json(objeto.items);
    }
    catch (error) {
        logger.error(error);
    }
}
);

routes.post('/carrito/:id/productos/:id_prod', async (req, res) => {
    try {

        let producto = await productosDao.getById(req.params.id_prod);
        let objeto = await carritosDao.addProducto(req.params.id, producto);
        res.json(objeto);
    }
    catch (error) {
        logger.error(error);
    }
}
);

routes.delete('/carrito/:id/productos/:id_prod', async (req, res) => {
    try {
        let objeto = await carritosDao.deleteProducto(req.params.id, req.params.id_prod);
        res.json(objeto);
        }
        catch (error) {
            logger.error(error);
            }
        });        

routes.get('/carrito', async (req, res) => {
    try {
        let objeto = await carritosDao.getAll();
        res.json(objeto);
        }
        catch (error) {
            logger.error(error);
            }
        });


//hagamos una ruta que reciba los productos del carrito y los envie en un email de forma automática
routes.post('/carrito/:id/email', async (req, res) => {
    try {
        let objeto = await carritosDao.getAllById(req.params.id);
        res.json(objeto);
        try{
            await transporter.sendMail({
                from: `"admin" <${mailer.mailer_user}>`,
                to: mailer.mailer_user,
                subject: 'Nuevo usuario registrado',
                html: '<h1>Nuevo usuario registrado</h1>' +
                '<p>El usuario ' + objeto.user + ' ha comprado </p>' +
                '<ul>' +
                objeto.items.map(item => '<li>' + item.nombre + '</li>').join('') +
                '</ul>'
                
            });
        }
        catch(err){
            logger.info(err);
        }
    }
    catch (error) {
        logger.error(error);
    }
}
);



    module.exports = routes;