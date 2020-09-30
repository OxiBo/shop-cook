const mongoose = require("mongoose"),
  { Schema } = mongoose;

const recipeSchema = new Schema({
  title: String,
  image: String,
  recipeId: String,
  sourceName: String,
  sourceUrl: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("recipes", recipeSchema);
