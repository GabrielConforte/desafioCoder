import React from 'react';
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;
function Formulario() {

    const addProducto = (e) => {
        e.preventDefault();
        //usa fetch para enviar atravez de body los datos del formulario, evita que envie datos vacios
        fetch(`${BASE_URL}/api/productos`, {
            method: "POST",
            body: JSON.stringify({
                title: e.target.title.value,
                price: e.target.price.value,
                thumbnail: e.target.thumbnail.value,
                description: e.target.description.value,
                code: ((Math.random() * 10000)+ new Date().getTime()),
                stock: e.target.stock.value
            }),
            headers: {
                "Content-Type": "application/json"

            }
        })
        .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }


        return (
                    <div className="col-5">
                        <div className="card">
                            <div className="card-body">

                            <form onSubmit={addProducto}>
                                <div className="form-group">
                                    <label>Nombre Producto</label>
                                    <input type="text" className="form-control" id="title" name="title"placeholder="Nombre"></input>
                                </div>
                                <div className="form-group">
                                    <label>Precio</label>
                                    <input type="number" className="form-control" id="price" name="price"placeholder="Precio"></input>
                                </div>
                                <div className="form-group">
                                    <label>Imagen</label>
                                    <input type="text" className="form-control" id="thumbnail" name="thumbnail"placeholder="Url imagen"></input>
                                </div>
                                <div className="form-group">
                                    <textarea width="150px" maxLength="128" id="description" name="description"className='rounded s' placeholder='Descripcion - 128c max.'></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input type="number" className="form-control" id="stock" name="stock"placeholder="Stock"></input>
                                </div>
                                <button type="submit" className="btn btn-dark text-info">Enviar</button>
                                <button type='reset' className="btn btn-dark text-info">Limpiar</button>
                                <button type='button' className="btn btn-dark text-info" onClick={
                                    () => {
                                        window.history.back();
                                    }}>Regresar</button>
                            </form>

                                </div>
                        </div>
                    </div>
        )
    }

export default Formulario;