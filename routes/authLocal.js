const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  bcrypt = require("bcryptjs");
(User = mongoose.model("users")),
  ({ randomBytes } = require("crypto")),
  ({ promisify } = require("util")),
  (resetMailer = require("../services/resetMailer"));

require("../services/passportLocal");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/api/signup", async (req, res) => {
  try {
    const foundUser = await User.findOne({
      "local.email": req.body.email,
    });
    if (foundUser) {
      res.status(401).send({ message: "This email has been already taken" });
    } else {
      passport.authenticate("local")(req, res, () => {
        // const newUser = {
        //   local: { email: req.user.local.email, name: req.user.local.name },
        // };
        // console.log(req.user)
        res.send(req.user);
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
      res.status(401).send({ message: "No user found" });
      //   res.status(401).send({ error: "No user found" });
    } else if (!foundUser.validPassword(req.body.password)) {
      res.status(401).send({ message: "Wrong password" });
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log(req.user);
        // console.log(foundUser);
        res.send(foundUser);
      });
    }
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }
});
// post or patch??
router.patch("/api/request-reset", async (req, res) => {
  console.log(req.body);
  // res.send("email delivered");
  // check if the user with provided email exists
  let userExists;
  try {
    [userExists] = await User.find({
      "local.email": req.body.email.toLowerCase(),
    });
    if (!userExists) {
      res.status(401).send({ message: "No User Found For Provided Email" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
  // generate reset token and update user with the token and expiry reset token
  // console.log(randomBytes)
  // console.log(promisify(randomBytes))
  const randomBytesPromisified = promisify(randomBytes);
  const resetToken = (await randomBytesPromisified(20)).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
  let updatedUser;
  try {
    // console.log(userExists);
    updatedUser = await User.findByIdAndUpdate(
      userExists._id,
      {
        "local.resetToken": resetToken,
        "local.resetTokenExpiry": resetTokenExpiry,
      },
      { new: true }
    );
    // console.log(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }

  // email them reset token, wrapping it in try{}catch is recommended for mail sending here
  resetMailer(updatedUser.local.email, updatedUser.local.resetToken);
  res.send({ message: "Reset link has been sent to your email" });
});

router.get("/api/reset", (req, res) => {
  res.send("get reset");
});

router.patch("/api/reset", async (req, res) => {
  try {
    const foundUser = await User.findOne({
      "local.resetToken": req.body.resetToken,
    });
   
    if (!foundUser) {
      res.status(401).send({ message: "Your link is invalid" });
    }
    if (foundUser.local.resetTokenExpiry < Date.now() - 3600000) {
      return res.status(401).send({ message: "Your link has expired!" });
    }

    const newHashedPassword = await bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10),
      null
    );
    // console.log(newHashedPassword)
    foundUser.local.password = newHashedPassword;
    foundUser.local.resetToken = "";
    foundUser.local.resetTokenExpiry = null;
    await foundUser.save();

    // console.log(foundUser)
    req.user = foundUser;
    // console.log(foundUser)

    res.send(req.user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
