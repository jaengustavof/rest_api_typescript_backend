import { Router } from "express";
import { getProduct, getProductById, createProduct, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Product: 
 *          type: object 
 *          properties: 
 *              id: 
 *                  type: integer 
 *                  description: The Product ID 
 *                  example: 1
 *              name:
 *                  type: string 
 *                  description: The Product name 
 *                  example: Monitor curvo 49 pulgadas
 *              price:
 *                  type: number 
 *                  description: The Product price 
 *                  example: 300
 *              availability:
 *                  type: boolean 
 *                  description: The Product Availability 
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: Returns a list of products
 *      responses:
 *          200:
 *              description: Succesful response
 *              content: 
 *                  application/json:
 *                      schema:
*                           type: array
*                           items:
 *                              $ref: '#/components/schemas/Product' 
 */
//$ref: '#/components/schemas/Product' -es el schema que hemos establecido en la linea 9
router.get('/', getProduct);


/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Returns a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
);



/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 * 
 *      description: Returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Product created succesfully
 *          400:
 *              description: Bad request - invalid input data
 */

/**
 * router.post('/', (req, res) => {
    res.json('Desde POST');
});*/

router.post('/', 
    //validacion express-validator (se puede poner aqui on en el handler)
    body('name')
    .notEmpty().withMessage('el nombre de producto no puede ir vacio'),

    body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('el precio de producto no puede ir vacio')
    .custom( value => value > 0).withMessage('precio no valido'),

    handleInputErrors, 
    createProduct
); //traigo la funcion createProduct desde los handlers


/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Updates a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer 
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated succesfully
 *              content:
 *                 application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 *          404:
 *              description: Product not found  
 * 
 * 
 * 
 */

//PUT- reemplaza el elemento con lo que le envies
router.put('/:id', 

    //validacion express-validator (se puede poner aqui on en el handler)
    param('id').isInt().withMessage('ID no valido'),

    body('name')
    .notEmpty().withMessage('el nombre de producto no puede ir vacio'),

    body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('el precio de producto no puede ir vacio')
    .custom( value => value > 0).withMessage('precio no valido'),

    body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'),

    handleInputErrors,

    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updates a product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product updated succesfully
 *              content:
 *                 application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid ID
 *          404:
 *              description: Product not found                     
 * 
 * 
 * 
 */


// Patch - reemplaza unicamente el atributo que enviemos
router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
);

/**
 * 
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: 'Producto eliminado correctamente'
 *              content:
 *                 application/json: 
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          400:
 *              description: Bad request - invalid ID
 *          404:
 *              description: Producto no encontrado 
 * 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
);

export default router;
