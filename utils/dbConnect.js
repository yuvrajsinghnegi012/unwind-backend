import mongoose from "mongoose";
import { tryCatch } from "./features.js";

const dbConnect = () => tryCatch(
    mongoose
        .connect(process.env.MONGODB_URI || "", {
            dbName: "unwind",
        })
        .then((con) => {
            console.log(`DB started successfully at: ${con.connection.host}`)
        })
)

export default dbConnect;