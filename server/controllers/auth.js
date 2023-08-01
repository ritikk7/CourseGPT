const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedToken');
const homeURL =
  process.env.NODE_ENV !== 'development' ? '/' : 'http://localhost:3000/';

async function register(req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const pass = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password: pass,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      throw new Error('Error while saving user');
    }

    signToken(savedUser.id, res);
    res.json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    signToken(user.id, res);
    res.json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function logout(req, res) {
  try {
    await blacklistToken(req.cookies.token);
    res.clearCookie('token');
    res.json({ message: 'Successfully logged out' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePassword(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password does not match' });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAuthorizedUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function validateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const blacklistedToken = await BlacklistedToken.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({
      error: 'Token is blacklisted. Presumably because user logged out.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = { id: decodedToken.user.id };
    next();
  });
}

function signAndRedirect(req, res) {
  signToken(req.user.id, res);
  res.redirect(homeURL);
}

function signToken(userId, res) {
  const payload = {
    user: {
      id: userId,
    },
  };
  const isProduction = process.env.NODE_ENV === 'production';

  const productionExpireDays = 5;
  const expireMinutes = productionExpireDays * 24 * 60;
  const expireInMs = expireMinutes * 60 * 1000;
  const expireInS = expireMinutes * 60;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expireInS,
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: expireInMs,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
  });
}

async function blacklistToken(token) {
  try {
    await BlacklistedToken.create({ token });
  } catch (error) {
    console.log('Error blacklisting token:', error);
  }
}

module.exports = {
  register,
  login,
  validateToken,
  getAuthorizedUser,
  signAndRedirect,
  logout,
  updatePassword,
};

/**
 * All code written by team.
 * Helped with understanding:
 * - https://www.passportjs.org/packages/passport-google-oauth20/
 * - https://www.youtube.com/playlist?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
 * - Mongoose docs
 * - Stack Overflow / Google
 * - ChatGPT
 */
