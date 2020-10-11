const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcryptjs");

const userSchema = new Schema({
  local: {
    email: String,
    name: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Number
  },
  //   shoppingLists: [{ type: Schema.Types.ObjectId, ref: "ShoppingList" }],
  // recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  google: {
    id: String,
    email: String,
    name: String,
    token: String,
  },
  shoppingList: {type: Array, default: []},
  recipesLiked: [
    {
      recipe: { type: Schema.Types.ObjectId, ref: "Recipe" },
      // like: { type: Boolean, default: false },
      recipeId: String, // use this field for quick check if the recipe has been added to favorites
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});

// generating a hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  // console.log(this)
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("users", userSchema);
