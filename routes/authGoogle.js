const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  User = mongoose.model("users");

require("../services/passportGoogle");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
 (req, res) => {
    // Successful authentication, redirect home.
    
    res.redirect("/");
  }
);


module.exports = router;
