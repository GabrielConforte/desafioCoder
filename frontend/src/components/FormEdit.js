//crea un componente de react llamado FormEdit, que reciba datos por props y los pase por consola
import React from "react";
import { useState, useEffect} from "react";

function FormEdit(){
    //detecta el endpoint de la url
    const endpoint = window.location.pathname.split("/")[2];
    const [producto, setProducto] = useState({});
    const URL = "http://localhost:8081";
    console.log(`${URL}/api/productos/${endpoint}`)
    
    useEffect(() => {
        setTimeout(() => {
        getProducto();
        }, 1000);
    }, []);

    const getProducto = () => {
        fetch(`${URL}/api/productos/${endpoint}`)
        .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("Error al obtener los productos");
        })
        .then((resObject) => {
            setProducto(resObject);
        })
        .catch((err) => {
            console.log(err);
        });
    };



    const editProducto = (e) => {
        e.preventDefault();
        console.log(e.target.description.value);
        fetch(`${URL}/api/productos/${producto._id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: e.target.title.value,
                price: e.target.price.value,
                thumbnail: e.target.thumbnail.value,
                description: e.target.description.value,
                codigo: e.target.codigo.value,
                stock: e.target.stock.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            alert(data);
            window.location.reload();
        })
    }

return(
<div className="container">
  <div className="card">
<div className="card-body">
    <h5 className="card-title">Editar producto</h5>
    <div className="card-text">
        <form onSubmit={editProducto}>
            <div className="form-group">
                <label>Nombre Producto</label>
                <input type="text" className="form-control" id="title" name="title" defaultValue={producto.title}></input>
            </div>
            <div className="form-group">
                <label>Precio</label>
                <input type="number" className="form-control" id="price" name="price" defaultValue={producto.price}></input>
            </div>
            <div className="form-group">
                <label>Imagen</label>
                <input type="text" className="form-control" id="thumbnail" name="thumbnail" defaultValue={producto.thumbnail}></input>
            </div>
            <div className="form-group">
                <textarea width="150px" maxLength="128" id="description" name="description" className='rounded s' defaultValue={producto.description}></textarea>
            </div>
            <div className="form-group">
                <label>Codigo</label>
                <input type="number" className="form-control" id="codigo" name="codigo" defaultValue={producto.codigo}></input>
            </div>
            <div className="form-group">
                <label>Stock</label>
                <input type="number" className="form-control" id="stock" name="stock" defaultValue={producto.stock}></input>
            </div>
            <button type="submit" className="btn btn-dark text-info m-2">Enviar</button>
            <button type="button" className="btn btn-dark text-info m-2" onClick={() => window.location.href = "/"}>Regresar sin cambios</button>
        </form>
    </div>
</div>
</div>  
</div>

)}

export default FormEdit;

/**
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Editar producto</h5>
                    <div className="card-text">
                        <form>
                            <div className="form-group">

                            </div>
                        </form>
                    </div>
                </div>
            </div> */