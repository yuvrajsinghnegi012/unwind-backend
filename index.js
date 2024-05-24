import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./config/cloudinary.js";
import { errorMiddleware } from "./middlewares/error.js";
import propertyRoutes from "./routes/property.js";
import userRoutes from "./routes/user.js";
import dbConnect from "./utils/dbConnect.js";

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
app.use("/api/v1/property", propertyRoutes);
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