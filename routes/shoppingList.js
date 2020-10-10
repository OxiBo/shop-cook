// TODO - add isLoggedin middleware

const router = require("express").Router(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = mongoose.model("users"),
  isLoggedIn = require("../middlewares/isLoggedIn"),
  sendEmail = require("../services/mailer");
//   Recipe = mongoose.model("recipes");

router.use(bodyParser.urlencoded({ extended: true }));

// create and mail shopping list
// TODO add isLoggedIn middleware
router.patch("/api/shoppingList/new", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        shoppingList: req.body,
      },
      { new: true }
    );
    // console.log(user);

    const shoppingList = req.body;
    // remove last element which is email address
    let email = shoppingList.pop().email;
    const sendToMyself =
      (user.google && user.google.email) || (user.local && user.local.email);
    if (!email) {
      email = sendToMyself;
    }
    
    sendEmail(shoppingList, email, sendToMyself);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  res.send("creating shopping list");
});

module.exports = router;
