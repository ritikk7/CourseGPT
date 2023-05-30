const express = require('express');
const router = express.Router({mergeParams: true});
const {jwtSign, login, register} = require("../controllers/auth");
const passport = require("passport");


router.get('/google', passport.authenticate('google', {session: false, scope: ['profile', 'email']}))

router.get('/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/login'}), jwtSign);

router.post('/register', register);

router.post('/login', login);

module.exports = router;

// HELPED WITH UNDERSTANDING
// https://www.passportjs.org/packages/passport-google-oauth20/
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
