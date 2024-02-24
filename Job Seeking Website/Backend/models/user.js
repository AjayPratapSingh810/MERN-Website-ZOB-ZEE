import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    role: {
        type: String,
        require: true,
        enum: ["job seeker", "for hiring"],
    },
    password: {
        type: String,
        require: true
    }
});
export const User = mongoose.model("User", userSchema);