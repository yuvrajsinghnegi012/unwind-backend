import express from "express";
import { config } from "dotenv";
import dbConnect from "./utils/dbConnect.js";
import userRoutes from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./config/cloudinary.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;
config();
dbConnect();
cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); /// To accept images sent as multipart form
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.use("/api/v1/user", userRoutes);
app.get("/", (req, res)=>{
    res.json(`App is listening on api/v1/`);
    return;
})

// Error Handler
app.use(errorMiddleware);

// Listen To Port
app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
})