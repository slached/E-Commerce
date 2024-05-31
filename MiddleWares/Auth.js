const jwt = require('jsonwebtoken')
const IsAuthed = (req, res, next) => {
    const authCookie = req.cookies.auth

    if (authCookie) {
        try {
            jwt.verify(authCookie, process.env.JWT_SECRET)
        } catch (e) {
            res.clearCookie("auth")
            return res.status(200).json({message: "Your cookie has been manipulated", status: 400})
        }
        next()
    } else {
        return res.status(200).json({message: "You don't have authorization to get user details.", status: 403})
    }
}

module.exports = IsAuthed