//crea un context provider que guarde el carritoID en el contexto

import React, {createContext,useState,useEffect} from "react";
    
export default function ContextoCarrito(props) {
    const [carritoId,setCarritoId] = useState();

    
    useEffect(() => {
        fetch("http://localhost:8081/api/carrito")
        .then(res => res.json())
        .then(data => {
            if(data.length > 0){
                console.log(data[0]._id);
                setCarritoId(data[0]._id);
            }
            else{
                fetch("/api/carrito", {
                    method: "POST"
                })
            }
        })
    }, []);


    return(
        <AppContext.Provider value={[carritoId,setCarritoId]}>
            {props.children}
        </AppContext.Provider>
    )
}

export const AppContext = createContext();