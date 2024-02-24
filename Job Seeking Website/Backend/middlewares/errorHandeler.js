const errorHandeler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message,
    })
}

export default errorHandeler;