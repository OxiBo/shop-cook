const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  User = mongoose.model("users");

require("../services/passportLocal");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/api/signup", async (req, res) => {
  try {
    const foundUser = await User.findOne({
      "local.email": req.body.email,
    });
    if (foundUser) {
      res.send({ error: "This email has been already taken" });
    } else {
      passport.authenticate("local")(req, res, () => {
        const newUser = {
          local: { email: req.user.local.email, name: req.user.local.name },
        };
        res.send(newUser);
      });
    }
  } catch (err) {
    console.error(error);
    res.status(422).send(error);
  }
});

router.post("/api/login", async (req, res) => {
  // check if username exist in database
  try {
    const foundUser = await User.findOne({
      "local.email": req.body.email,
    });
    if (!foundUser) {
      res.status(401).send({ error: "No user found" });
    } else if (!foundUser.validPassword(req.body.password)) {
      res.status(401).send({ error: "Wrong password" });
    } else {
      passport.authenticate("local")(req, res, () => {
        // console.log(req.user);
        res.send(foundUser);
      });
    }
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }
});

module.exports = router;
