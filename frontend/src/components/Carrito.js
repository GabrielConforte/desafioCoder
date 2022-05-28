import React , {useState, useEffect} from "react";
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;


function Carrito() {
    const [carrito, setCarrito] = useState(JSON.parse(sessionStorage.getItem('carrito')));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [loader, setLoader] = useState(true);

    useEffect(() => {
                if(carrito===null){
                    getLista();
                }else{
                    getLista();
                    setLoader(false);}
                
    }, [carrito]);


    const getLista = () => {
        fetch(`${BASE_URL}/api/carrito/${user._id}`)
        .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("Error al obtener los productos");
        })
        .then((resObject) => {
            setTimeout(() => {
            sessionStorage.setItem('carrito', JSON.stringify(resObject));
            setCarrito(resObject);
                setLoader(false);
            }
            , 1000);
        }
        ) 
        .catch((err) => {
            console.log(err);
        });
    };

    const eliminarProducto = (id) => {
        fetch(`${BASE_URL}/api/carrito/${user.id}/productos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                setCarrito(carrito.filter(producto => producto.code !== id));
            })
    }

    const vaciarCarrito = () => {
        fetch(`${BASE_URL}/api/carrito/${user._id}`, {
            method: "DELETE"
        }).then(res => res.json())
        .then(data => {
                sessionStorage.removeItem('carrito');
            })
    }
    return (
        <div className="col-2 m-auto">
            <div className="row">
                <h5 className="">Carrito</h5>
                <div className="">
                    
                    {loader ? <div className="loader">?</div> : <> {carrito.items.length > 0 ? (
                        <div>
                            <ul className="list-group m-2 text-center">
                                {carrito.items.map(producto => (
                                    <li className="list-group-item" key={producto.code}>
                                        <div className="row">
                                            <div className=" m-2 card">
                                                {producto.title}
                                            </div>
                                            <div className=" m-2 card">
                                                ${producto.price}
                                            </div>
                                            <div>
                                                {"x" + producto.cant}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="row">
                                <div className="col-6">
                                    <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar carrito</button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-success">Pagar</button>
                                </div>
                            </div>
                        </div>
                    ) 
                        
                    : 
                        <div className="alert alert-info" role="alert"> no hay productos </div>
                    }</>}
                    
                </div>
            </div>
        </div>
    );

}

export default Carrito;