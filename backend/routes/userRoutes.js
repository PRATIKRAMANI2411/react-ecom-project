import express from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Users from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(async (req, resp) => {
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
userRouter.post('/signup', asyncHandler(async (req, resp) => {
    const newuser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    const user = await newuser.save();
    resp.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
    // resp.status(401).send({ message: 'Invelid email or password' })
})
);

userRouter.put(
    '/profile',
    isAuth,
    asyncHandler(async (req, res) => {
        const user = await Users.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }

            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    })
);

export default userRouter;