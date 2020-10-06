// TODO - add isLoggedin middleware

const router = require("express").Router(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = mongoose.model("users");
//   Recipe = mongoose.model("recipes");

router.use(bodyParser.urlencoded({ extended: true }));

// create and mail shopping list
// TODO add isLoggedIn middleware
router.patch("/api/shoppingList/new", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      shoppingList: req.body,
    }, { new: true });
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  res.send("creating shopping list");
});

module.exports = router;
