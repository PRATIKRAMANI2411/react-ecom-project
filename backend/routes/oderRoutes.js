import express from "express";
import bcrypt from "bcryptjs";
import Order from '../models/orderModel.js';
import asyncHandler from "express-async-handler";

import { generateToken, isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    asyncHandler(async (req, resp) => {
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const order = await newOrder.save();
        resp.status(201).send({ message: 'New order Created', order })
    })
);

export default orderRouter;