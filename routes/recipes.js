const router = require("express").Router(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = mongoose.model("users"),
  Recipe = mongoose.model("recipes");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/api/recipes/add", async (req, res) => {
//   console.log(req.body);
//   console.log(req.user);

  try {
    // check if the recipe is already in the database (liked by a user)
    const recipeExists = await Recipe.findOne({ recipeId: req.body.recipeId });
    // console.log(recipeExists)
    if (recipeExists) {
    //   console.log(recipeExists);

      // check if logged in user already have this recipe among their favorites
      // const updatedRecipe = await recipeExists.updateOne({
      const alreadyLikedRecipe = recipeExists.users.find((userId) =>
        userId.equals(req.user.id)
      );

    //   console.log(alreadyLikedRecipe);

      if (alreadyLikedRecipe) {
        // if the user already "liked" the recipe, delete it from the favorites list (deleted it from user model and delete it form recipe (users array))
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeExists.id, {
          $pull: { users: req.user.id },
        });
        // delete the recipe from database if no user liked it
        // console.log(updatedRecipe);
        console.log(updatedRecipe.users)
        if(!updatedRecipe.users.length){
        const deleted =    await Recipe.findByIdAndRemove(updatedRecipe.id)
     
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
          $pull: { recipesLiked: { recipe: recipeExists.id } },
        }, { new: true});
        // console.log(updatedUser);

        res.send(updatedUser);
      } else {
        // if the user did not "like" the recipe, add it to the list of user favorite recipes and add the user to the recipe (users array)"
        const addedLikeRecipe = await Recipe.findByIdAndUpdate(
          recipeExists.id,
          { $push: { users: req.user.id } }, { new: true}
        );
        // console.log(addedLikeRecipe);

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
          $push: {
            recipesLiked: {
              recipe: recipeExists.id,
              recipeId: recipeExists.recipeId,
            },
          },
        }, { new: true});
        // console.log(updatedUser);
        res.send(updatedUser);
      }

      // })
    } else {
      const newRecipe = new Recipe({ ...req.body, users: req.user.id });
      newRecipe.save();
      await req.user.recipesLiked.push({
        recipe: newRecipe,
        recipeId: newRecipe.recipeId,
      });
      await req.user.save();
      res.send(newRecipe); // SEND USER BACK??
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to save the recipe" });
  }
});

module.exports = router;
