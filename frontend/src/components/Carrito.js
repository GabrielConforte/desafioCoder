import React , {useState, useEffect} from "react";
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;


function Carrito() {
    const [carrito, setCarrito] = useState(JSON.parse(sessionStorage.getItem('carrito')));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [loader, setLoader] = useState(true);
    const [aux, setAux] = useState([]);

    useEffect(() => {
                if(carrito===null){
                    getLista();
                }else{
                    getLista();
                    setLoader(false);}
                
    }, [carrito, loader]);


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
                setCarrito([]);
                sessionStorage.removeItem('carrito');
                window.location.reload();
            })
    }
    return (
        <div className="col-2">
            <div className="card-body">
                <h5 className="card-title">Carrito</h5>
                <div className="card-text">
                    
                    {loader ? <div className="loader">?</div> : <> {carrito.items.length !== 0 ? (
                        <div>
                            <ul className="list-group">
                                {carrito.items.map(producto => (
                                    <li className="list-group-item" key={producto.code}>
                                        <div className="row">
                                            <div className="col-6">
                                                {producto.title}
                                            </div>
                                            <div className="col-6">
                                                {producto.price}
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
                        
                    : <div>No hay productos</div>
                    }</>}
                    
                </div>
            </div>
        </div>
    );

}

export default Carrito;



/**628ade6da144d3db4b8304e7 GABRIEL CONFORTE
 * 
 * 628f9b30eb8dd2292feebde1
 * 628f9b30eb8dd2292feebde1
 * 
 *  1233
 */