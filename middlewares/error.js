export const errorMiddleware = (err, req, res)=> {
    err.message = err.message || "Internal server error";
    err.statusCode  = err.statusCode || 500;

    if (err.name === "CastError") err.message = "Invalid ID";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}