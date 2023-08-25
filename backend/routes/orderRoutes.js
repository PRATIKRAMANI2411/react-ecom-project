import express from "express";
import bcrypt from "bcryptjs";
import Order from '../models/orderModel.js';
import asyncHandler from "express-async-handler";

import { isAuth } from "../utils.js";

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

orderRouter.get(
    '/:id',
    isAuth,
    asyncHandler(async (req, resp) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            resp.send(order)
        } else {
            resp.status(404).send({ message: 'Order Not Found' })
        }
    })
);

orderRouter.put(
    '/:id/pay',
    isAuth,
    asyncHandler(async (req, resp) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true,
                order.paidAt = Date.now(),
                order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.email_address,
                };
            const updateOrder = await order.save();
            resp.send({ message: 'Order paid', order: updateOrder });
        } else {
            resp.status(404).send({ message: 'Order Not Found' })
        }
    })
);


export default orderRouter;