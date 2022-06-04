import React,{ useState, useEffect} from "react";
import socket from "./Socket";

//hagamos un componente chat
export default function Chat({user}) {
    const [usuario, setUsuario] = useState(user);
    const [mensaje, setMensaje] = useState("");
    const [listaMensajes, setListaMensajes] = useState([]);

    useEffect(() => {
    socket.emit("connection", usuario._id);
    }, [user]);

    useEffect(() => {
        socket.on('listaMensajes', mensaje => {
            setListaMensajes([...listaMensajes, mensaje]);
            console.log(listaMensajes);
        });
        return () => {
            socket.off();
        }
    }, [listaMensajes]);

    const submit = (e) => {
        e.preventDefault();
        socket.emit("mensajeEnviado", [usuario, mensaje]);
        setMensaje("");
    }


    return (<>
    <div className="p-4">
            <div className="Card ">
                
                <div className="card-body">
                
                <div className="card-text">
                <form onSubmit={submit}>
                    <input type="text" className="form-control" cols="30" rows="10" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="ingrese mensaje"></input>
                    <button className="btn btn-primary m-2 ml-auto">Enviar</button>
                </form><ul className="list-group overflow-scroll">{listaMensajes[0].map((e,i) => <li key={i}>{e.mensaje} - {usuario.nombre}</li>)}</ul>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}