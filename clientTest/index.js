//hagamos un cliente http para que el servidor se quede escuchando, usando axios para hacer la peticion a api/products
const axios = require('axios');



const main = async () => {
    try {
        await traerProductos();
        //const id = await insertarProducto();
        //await traerUnProducto(id);
        //await actualizarProducto(id);
        //await eliminarProducto(id);
    }
    catch (err) {
        console.log(err);
    }
}



const traerProductos = async () => {
    try {
        const res = await axios.get(
            'http://localhost:8080/graphql/getproductos?query=query{getAllProductos{id,title,price}}'
        );
        //imprime en consola cada producto que reciba
        res.data.data.getAllProductos.forEach(producto => {
            console.log(producto);
        }
        );
    }
    catch (err) {
        console.log(err);
    }
}

const traerUnProducto = async () => {
    try {
        const res = await axios.get('http://localhost:8080/graphql/productos?query=query{productos(id:1){id,title,price}}');
        console.log(res.data);
    }
    catch (err) {
        console.log(err);
    }
}

const insertarProducto = async () => {
    try {
        const res = await axios.post('http://localhost:8080/graphql/productos', {
            nombre: 'nuevo producto',
            precio: '100',
            descripcion: 'nuevo producto',
            img: 'nuevo producto'
        });
        console.log(res.data);
        return res.data.id;
    }
    catch (err) {
        console.log(err);
    }
}

const eliminarProducto = async (id) => {
    try {
        const res = await axios.delete('http://localhost:3000/api/productos/' + id);
        console.log(res.data);
    }
    catch (err) {
        console.log(err);
    }
}

const actualizarProducto = async (id) => {
    try {
        const res = await axios.put(`http://localhost:3000/api/productos/${id}`
        , {
            nombre: 'nuevo editado',
            precio: '100',
            descripcion: 'nuevo editado',
            img: 'nuevo producto'
        });
        console.log(res.data);

    }
    catch (err) {
        console.log(err);
    }
}



main();
