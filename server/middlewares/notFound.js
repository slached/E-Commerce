const notFound = (req, res, next) => {
    res.json({message: 'Not Found', status: 404})
}

module.exports = notFound