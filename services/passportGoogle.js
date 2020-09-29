//https://www.udemy.com/course/react-redux/learn/lecture/12700577#content

const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  mongoose = require("mongoose"),
  keys = require("../config/keys"),
  User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      try {
        const foundUser = await User.findOne({ "google.id": id });
        if (foundUser) {
          return done(null, foundUser);
        }
        const newUser = await new User({
          google: {
            id: id,
            email: emails[0].value,
            name: displayName,
            token: accessToken,
          },
        }).save();
        return done(null, newUser);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);
