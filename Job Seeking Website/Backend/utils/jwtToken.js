import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, message, res) => {
    // Your secret key should be stored in a secure way, preferably in an environment variable
    const secretKey = process.env.JWT_SECRET_KEY;

    // Token expiration time (e.g., 1 hour)
    const expiresIn = '1h';
    const options = {
        httpOnly: true, // Set httpOnly to true

    };
    // Create the token
    const token = jwt.sign({ user }, secretKey, { expiresIn });

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
}
export default sendToken;