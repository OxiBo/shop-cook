const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcryptjs");

const userSchema = new Schema({
  local: {
    email: String,
    name: String,
    password: String,
  },
  //   shoppingLists: [{ type: Schema.Types.ObjectId, ref: "ShoppingList" }],
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  google: {
    id: String,
    email: String,
    name: String,
    token: String,
  },
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
