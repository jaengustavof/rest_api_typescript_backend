import { Request, Response } from "express";
import Product from "../models/Product.model";


export const getProduct = async (req: Request, res: Response) => {
    
    const products = await Product.findAll({
        order: [
            ['id', 'ASC']
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}
    });

    res.json({data: products})
    
}

export const getProductById = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    res.json({data: product})
}

export const createProduct = async (req: Request, res: Response) => {

    const product = await Product.create(req.body);
    res.status(201).json({data: product}) //cuando trabajanos ocn la creacion de un dato se debe devolver 201
        
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Actualizar - actualiza solo los valores que le estes enviando. Si solo enviamos price en el bady, cambia el price y deja todos los otros valores como estabam
    await product.update(req.body);
    await product.save();

    res.json({data: product});
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //actualizamos al contrario de lo que tiene
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({data: product});
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    await product.destroy();

    res.json({data: 'Producto eliminado'});
}