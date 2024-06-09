import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4); //la respuesta del error es un array de 4 posiciones

        expect(response.status).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Monitor testing",
            price : 0
        });

        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1); //la respuesta del error es un array de 1 posicion

        expect(response.status).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('should validate that the price is a number, greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Monitor testing",
            price : "Hola"
        });

        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2); //la respuesta del error es un array de 1 posicion

        expect(response.status).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(4);
    });

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Mouse - Testing",
            price : 50
        });

        expect(response.status).toEqual(201); //esta respuesta se establece en createProduct
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('errors');
    });

});

describe('GET /api/products', () => {

    it('should check if api/products url exist', async () =>{
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);

    })

    it('GET  a JSON response with products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toHaveProperty('errors');
        expect(response.status).not.toBe(404);

    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for non-existent products', async () => {

        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe("Producto no encontrado");
    });

    it('Should check a valid ID in the url', async () => {
        
        const response = await request(server).get('/api/products/not-valid-url');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no valido");


    });

    it('Get a single response for a single product', async () => {
        
        const response = await request(server).get('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

    });
})

describe('PUT /api/products/:id', () => {
    
    //Hacer las mismas validaciones que en el server
    it('Should check a valid ID in the url', async () => {
        
        const response = await request(server)
                                .put('/api/products/not-valid-url')
                                .send({
                                    name: "Monitor nuevo actualizado",
                                    price: 300,
                                    availability: true
                                });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no valido");

    });

    it('Should display validation error msgs when updating a product', async () => {

        const response = await request(server).put('/api/products/1').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');

    });

    it('Should validate that the price is greater than 0', async () => {

        const response = await request(server)
                                .put('/api/products/1')
                                .send({
                                    name: "Monitor nuevo actualizado",
                                    price: 0,
                                    availability: true
                                });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("precio no valido");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');

    });


    it('Should return a 404 forn a non-existant product', async () => {

        const productId = 40000;
        const response = await request(server)
                                .put(`/api/products/${productId}`)
                                .send({
                                    name: "Monitor nuevo actualizado",
                                    price: 300,
                                    availability: true
                                });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Producto no encontrado");

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');

    });

    it('Should update an existing product with valid data', async () => {

        const response = await request(server)
                                .put(`/api/products/1`)
                                .send({
                                    name: "Monitor nuevo actualizado",
                                    price: 300,
                                    availability: true
                                });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');

    });
    
})

describe('PATCH /api/products/:id', () => {
    it('Should return a 404 forn a non-existant product', async () => {
        
        const productId = 200;
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
                          
    })

    it('Should update the product availability', async () => {
        const productId = 1
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {

    it('should check a valid id', async () => {
        const response = await request(server).delete('/api/products/not-valid')

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no valido");
    })

    it('should return a 404 response on non-existing products', async () =>{
        const productId = 2000;
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toBe(200);
    })

    it('should delete a product with a valid id', async () => {
        const productId = 1
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
    })
})