const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user");

passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate(
                { googleId: profile.id },
                {
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                },
                function (err, user) {
                    return cb(err, user);
                }
            );
        }
    )
);

// https://www.passportjs.org/packages/passport-google-oauth20/
