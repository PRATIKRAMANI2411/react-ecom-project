import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
const seedRouter = express.Router();

seedRouter.get('/', async (req, resp) => {
    // await Product.remove({});
    // const creactProduct = await Product.insertMany(data.products);

    // await User.remove({});
    // const creactUser = await User.insertMany(data.users);
    // resp.send({ creactUser })
})
export default seedRouter;