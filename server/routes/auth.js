const express = require('express');
const router = express.Router({mergeParams: true});
const {googleAuth, googleCallback, jwtSign, login, register} = require("../controllers/auth");
const passport = require("passport");


router.get('/google', passport.authenticate('google', {session: false, scope: ['profile', 'email']}));

router.get('/google/callback', googleCallback, jwtSign);

router.post('/register', register);

router.post('/login', login);

module.exports = router;

// https://www.passportjs.org/packages/passport-google-oauth20/
