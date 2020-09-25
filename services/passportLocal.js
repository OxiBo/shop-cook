const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  mongoose = require("mongoose"),
  User = require("../models/User");

passport.use(
  "local",
  new LocalStrategy( // how to get different (other than username and password) form fields - https://stackoverflow.com/questions/36761291/how-can-i-store-other-form-fields-with-passport-local-js and documentation - https://github.com/jaredhanson/passport-local#parameters
    { passReqToCallback: true, usernameField: "email" }, 
    // https://stackoverflow.com/questions/18138992/use-email-with-passport-local-previous-help-not-working  http://www.passportjs.org/docs/username-password/
   
    async (req, username, password, done) => {
      const { name, email } = req.body;
      //   console.log(req.body)
      try {
        const existingUser = await User.findOne({ "local.email": username });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = await new User({
            local: { email: username, name },
          });
          newUser.local.password = newUser.generateHash(password);
          const user = await newUser.save();
          console.log(user);
          done(null, user);
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);
