import jwt from "jsonwebtoken";
import asyncHandeler from "express-async-handler";
import { User } from "../models/user.js";

const isAuthenticated = asyncHandeler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(500);
        throw new Error("No Token");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.user._id);
    } catch {
        res.clearCookie('token'); // Clear the token cookie
    }
    next();
})

export default isAuthenticated;