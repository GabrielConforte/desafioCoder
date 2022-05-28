
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
const {config} = require("../config/index.js");

/**ESTE COMPONENTE ESTA DESACTIVADO, SE MEJORARA EN EL FUTURO */

function CarritoIcon (user , carrito) {
    console.log(user)
    const [cantidad, setCantidad] = useState(0);
    const [loader, setLoader] = useState(true);
    
    useEffect(() => {
            getCantidad();
            setLoader(false);
    }
    , [cantidad, loader, carrito]);

    const getCantidad = async () => {
        if(carrito===null){
            setCantidad(0);
        }
        else{
            let cant= 0;
            for(let i=0; i<carrito.carrito.items.length; i++){
                cant+=carrito.carrito.items[i].cantidad;
            }
            setCantidad(cant);
        }

    }
    
return(
    <div>
    {loader ? (
    <div className="spinner-border text-primary" role="status"></div>
    ) : ( <><li className="btn btn-success item"><Link className="LinkCustom" to='/carrito' >x{cantidad}</Link></li></>)}
    </div>
)

}

export default CarritoIcon;