const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/user');

function googleCallback(req, res) {
    signToken(req.user.id, res);
    res.redirect("/login-success");
}

async function register(req, res, next) {
    try {
        console.log(req.body);
        const pass = await bcrypt.hash(req.body.password, 10);

        const newUser = await new User({
            email: req.body.email,
            password: pass,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        console.log(newUser);

        signToken(newUser.id, res);
        console.log("signed");
        res.redirect("/login-success");
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email');
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }

        signToken(user.id, res);
        res.redirect("/login-success");
    } catch (error) {
        next(error);
    }
}

async function me(req, res, next) {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ user: user});
    } catch (error) {
        next(error);
    }
}

function signToken(userId, res) {
    const payload = {
        user: {
            id: userId
        }
    }

    const expireDays = 5;
    const expireInMs = 1000 * 60 * 60 * 24 * expireDays;
    const expireInS = expireInMs / 1000;

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expireInS});

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: expireInMs,
    });
}

function validateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = { id: decodedToken.user.id }
        next();
    });
}


module.exports = {
    register,
    login,
    validateToken,
    me,
    googleCallback
};
