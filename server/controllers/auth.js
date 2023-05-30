const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/user');

function jwtSign(req, res) {
    console.log(req.user);
    const payload = {
        user: {
            id: req.user.id
        }
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5 days'});
    res.send({token});
}

async function register(req, res, next) {
    try {
        const pass = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            password: pass,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const user = await newUser.save();

        res.json(user);
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

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5 days'});
        res.send({token});
    } catch (error) {
        next(error);
    }
}

function validateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "bearer token"

    if (!token) {
        return res.status(401).send('No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
}

module.exports = {
    jwtSign,
    register,
    login,
    validateToken
};
