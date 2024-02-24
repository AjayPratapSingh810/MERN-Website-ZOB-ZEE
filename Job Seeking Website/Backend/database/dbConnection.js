import mongoose from "mongoose";


const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_SEEKING_WEBSITE",
    }).then(() => {
        console.log("database connected");
    }).catch(() => {
        res.status(500);
        throw new Error("database error");
    })
}
export default dbConnection;