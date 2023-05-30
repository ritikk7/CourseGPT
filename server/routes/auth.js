const express = require('express');
const router = express.Router({mergeParams: true});
const {googleAuth, googleCallback, jwtSign} = require("../controllers/auth");


router.get('/google', googleAuth);

router.get('/google/callback', googleCallback, jwtSign);

module.exports = router;

// https://www.passportjs.org/packages/passport-google-oauth20/
