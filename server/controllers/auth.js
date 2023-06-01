const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BlacklistedToken = require("../models/blacklistedToken");

function googleCallback(req, res) {
    signToken(req.user.id, res);
    const redirect = process.env.NODE_ENV !== "development" ? "/login-success" : "http://localhost:3000/login-success"
    res.redirect(redirect);
}

async function register(req, res, next) {
    try {
        const pass = await bcrypt.hash(req.body.password, 10);

        const newUser = await new User({
            email: req.body.email,
            password: pass,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        await newUser.save();
        signToken(newUser.id, res);
        res.send('Successful register');
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
        res.send('Successful login');
    } catch (error) {
        next(error);
    }
}

async function logout(req, res, next) {
    try {
        const token = req.cookies.token;
        await blacklistToken(token);
        res.clearCookie('token');
        res.send('Successfully logged out');
    } catch (error) {
        next(error);
    }
}

async function getAuthorizedUser(req, res, next) {
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
    const isProduction = process.env.NODE_ENV === 'production';

    const expireMinutes = isProduction ? 5 * 24 * 60 : 5;
    const expireInMs = expireMinutes * 60 * 1000;
    const expireInS = expireMinutes * 60;

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expireInS });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: expireInMs,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    });
}

async function blacklistToken(token){
    try {
        await BlacklistedToken.create({ token });
    } catch (error) {
        console.log('Error blacklisting token:', error);
    }
}


async function validateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('No token provided');
    }

    const blacklistedToken = await BlacklistedToken.findOne({ token });
    if (blacklistedToken) {
        return res.status(401).json({ error: 'Token is blacklisted. Presumably because user logged out.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = { id: decodedToken.user.id };
        next();
    });
}


module.exports = {
    register,
    login,
    validateToken,
    getAuthorizedUser,
    googleCallback,
    logout
};
