var chai = require('chai');
var expect = chai.expect;
chai.use(chaiHttp);

let id

expect('esto deberia traer todos los productos', async () => {
    const res = await request(app).get('/api/productos')
    .set('Accept', 'application/json')
    .expect("Content-Type", /json/)
    .expect(200, done)
    .end(function(err, res) {
        if (err) {
            console.log(err);
        }
    }
    );
}
);

expected('esto deberia crear un producto', async () => {
    const res = await request(app).post('/api/productos')
    .set('Accept', 'application/json')
    .send({
        nombre: 'nuevo producto',
        precio: '100',
        descripcion: 'nuevo producto',
        img: 'nuevo producto'
    })
    .expect("Content-Type", /json/)
    .expect(200, done)
    .end(function(err, res) {
        if (err) {
            console.log(err);
        }
    }
    );
    id = res.body.id;
}
);


expect('esto deberia traer un producto', async () => {
    const res = await request(app).get('/api/productos/'+id)
    .set('Accept', 'application/json')
    .expect("Content-Type", /json/)
    .expect(200, done)
    .end(function(err, res) {
        if (err) {
            console.log(err);
        }
    }
    );
}
);

expected('esto deberia actualizar un producto', async () => {
    const res = await request(app).put('/api/productos/'+id)
    .set('Accept', 'application/json')
    .send({
        nombre: 'editado',
        precio: '100',
        descripcion: 'nuevo producto',
        img: 'nuevo producto'
    })
    .expect("Content-Type", /json/)
    .expect(200, done)
    .end(function(err, res) {
        if (err) {
            console.log(err);
        }
    }
    );
}
);

expected('esto deberia eliminar un producto', async () => {
    const res = await request(app).delete('/api/productos/'+id)
    .set('Accept', 'application/json')
    .expect("Content-Type", /json/)
    .expect(200, done)
    .end(function(err, res) {
        if (err) {
            console.log(err);
        }
    }
    );
}
);