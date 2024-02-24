import express from "express";
import dbConnection from "./database/dbConnection.js";
import dotenv from "dotenv";
import errorHandeler from "./middlewares/errorHandeler.js";
import userRouter from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import cookieParser from "cookie-parser";
import applicationRouter from "./routes/applicationRoutes.js"
import cors from "cors";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config({ path: "./config/config.env" });

// it is a middleware used for connection of backend with frontend
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/application", applicationRouter);

dbConnection();

// this error handeler handels both express-async and custom errors.
app.use(errorHandeler);



cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});



app.listen(process.env.PORT_NO, () => {
    console.log(`server is connected ${process.env.PORT_NO}`);
})
