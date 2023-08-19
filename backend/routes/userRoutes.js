import express from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Users from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get('/signin', asyncHandler(async (req, resp) => {
    const user = await Users.findOne({ email: req.body.email });
        if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            resp.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
        }
    }
    resp.status(401).send({ message: 'Invelid email or password' })
})
);

export default userRouter;