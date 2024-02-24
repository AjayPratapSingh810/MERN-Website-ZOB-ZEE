import asyncHandler from "express-async-handler"
import { User } from "../models/user.js";
import sendToken from "../utils/jwtToken.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { Job } from "../models/jobModel.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        res.status(500);
        throw new Error("Enter all details carefully");
    }
    const Email = await User.findOne({ email });
    if (Email) {
        res.status(500);
        throw new Error("Email already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, phone, role, password: hashPassword,
    })
    sendToken(user, 201, "User Logged In !", res);

})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        res.status(400);
        throw new Error("Enter credentials carefully !");
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Email is not correct");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        res.status(400);
        throw new Error("your password is not correct");
    }
    if (role != user.role) {
        res.status(400);
        throw new Error("Role is not correct");
    }

    sendToken(user, 201, "User Logged In !", res);
});

export const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
    res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Logged Out Successfully.",
        });
});


