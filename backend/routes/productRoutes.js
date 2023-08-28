import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";


const productRouter = express.Router();

productRouter.get('/', async (req, resp) => {
    const product = await Product.find();
    resp.send(product)
});

productRouter.get('/categories',
    expressAsyncHandler(async (req, resp) => {
        const categories = await Product.find().distinct('category');
        resp.send(categories)
    }));

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    } else {
        res.send(404).send("Product Not Found")
    }
});

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.send(404).send("Product Not Found")
    }
});

export default productRouter;