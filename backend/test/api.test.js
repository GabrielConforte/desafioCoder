const request = require('supertest');
const app = require('./index');

let id;
it('esto debe traer una lista de productos', async () => {
    const res = await request(app).get('/api/products')
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

it('esto debe crear un producto', async () => {
    const res = await request(app).post('/api/products')
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

it('esto debe traer un producto', async () => {
    const res = await request(app).get('/api/products/'+id)
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

it('esto debe actualizar un producto', async () => {
    const res = await request(app).put('/api/products/'+id)
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
}
);

it('esto debe eliminar un producto', async () => {
    const res = await request(app).delete('/api/products/'+id)
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
