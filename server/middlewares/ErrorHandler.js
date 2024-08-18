const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(200).json({err: err.message, status: err.status});
}

module.exports = errorHandlerMiddleware