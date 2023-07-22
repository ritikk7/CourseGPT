const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  login,
  register,
  validateToken,
  getAuthorizedUser,
  logout,
  updatePassword,
  signAndRedirect,
} = require('../controllers/auth');
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    failureRedirect: '/login',
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  signAndRedirect
);

router.post('/register', register);

router.post('/login', login);

router.get('/get-auth-user', validateToken, getAuthorizedUser);

router.post('/logout', validateToken, logout);

router.patch('/update-password', validateToken, updatePassword);

module.exports = router;

/**
 * Helped with understanding:
 * - https://www.passportjs.org/packages/passport-google-oauth20/
 * - https://www.youtube.com/playlist?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
 */
