const router = require("express").Router(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = mongoose.model("users"),
  Recipe = mongoose.model("recipes");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/api/recipes/add", async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  try {
    const newRecipe = new Recipe({ ...req.body, user: req.user.id });
    newRecipe.save();
    await req.user.recipes.push(newRecipe);
    await req.user.save();
    res.send(newRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to save the recipe" });
  }
});

module.exports = router;
