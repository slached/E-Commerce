const jwt = require("jsonwebtoken");
const IsAuthed = (req, res, next) => {
    const authCookie = req.cookies.auth
    if (authCookie) {
        try {
            jwt.verify(authCookie, process.env.JWT_SECRET)
            next()
        } catch (e) {
            res.clearCookie("auth")
            return res.status(403).json({message: "Your token has been manipulated."})
        }
    } else {
        return res.status(200).json({message: "You don't have authorization to get user details.", status: 403})
    }
}

module.exports = IsAuthed