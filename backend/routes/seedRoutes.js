import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
const seedRouter = express.Router();

seedRouter.get('/', async (req, resp) => {
    // await Product.remove({});
    const creactProduct = await Product.insertMany(data.products);
    resp.send({creactProduct})
})
export default seedRouter;