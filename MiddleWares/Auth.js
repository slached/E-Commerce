const IsAuthed = (req, res, next) => {
    const authCookie = req.cookies.auth
    if (authCookie) {
        next()
    } else {
        return res.status(403).json({message: "You don't have authorization to get user details."})
    }
}

module.exports = IsAuthed