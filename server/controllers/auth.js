const passport = require("passport");
const jwt = require("jsonwebtoken");

async function googleAuth() {
    return passport.authenticate('google', {scope: ['profile', 'email']})
}

async function googleCallback() {
    return passport.authenticate('google', {failureRedirect: '/login'});
}

function jwtSign(req, res) {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.send({token});
}

module.exports = {
    googleAuth,
    googleCallback,
    jwtSign
};
