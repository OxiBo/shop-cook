const express = require("express"),
  keys = require("./config/keys"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  cookieSession = require("cookie-session"),
  app = express();

// have to require the model before requiring passport
require("./models/User");
require("./models/Recipe");
const User = mongoose.model("users");
const Recipe = mongoose.model("recipes");
// const User = mongoose.model("users");
require("./services/passportLocal");
require("./services/passportGoogle");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(
  cookieSession({
    name: "sessionsldkfsldkjflskdjf",
    maxAge: 31 * 24 * 60 * 60 * 1000, // a month?
    keys: [keys.cookieKey],
  })
);

// database configuration
try {
  mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  console.log("Connected to DB!");
} catch (err) {
  console.log("ERROR:", err.message);
}

if (process.env.NODE_ENV === "production") {
  // Express will serve production assets like main.css  or main.js files
  app.use(express.static("client/build"));

  // Express will serve index.html if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(passport.initialize()); // has to be put before requiring auth routes
app.use(passport.session()); // has to be put before requiring auth routes - require("./routes/authRoutes")(app);'

// middleware that logs user in when in process of resetting password
app.use("/api/reset", async (req, res, next) => {
  // find the user by the resetToken; the actual route will check if the token expired and reset password
  const foundUser = await User.findOne({
    "local.resetToken": req.body.resetToken,
  });
  req.body = {
    ...req.body,
    // password: foundUser.local.password || "",
    email: foundUser.local.email || "",
  };

  passport.authenticate("local")(req, res, () => {});
  next();
});

// require routes

const localAuthRoutes = require("./routes/authLocal");
const googleAuthRoutes = require("./routes/authGoogle");
const recipesRoutes = require("./routes/recipes");
const shoppingListRoutes = require("./routes/shoppingList");

// user routes
app.use(localAuthRoutes);
app.use(googleAuthRoutes);
app.use(recipesRoutes);
app.use(shoppingListRoutes);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  } catch (err) {
    done(new Error("Failed to deserialize user"));
  }
});

// app.get("/", (req, res) => {
//   // console.log(req.body)
//   res.send("Running!!!");
// });

app.get("/api/user", (req, res) => {
  try {
    // console.log(req.user);
    res.send(req.user);
  } catch (err) {
    console.error(err);
    res.status(401).send(err);
  }
});

// logout route
app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const PORT = process.env.PORT || 4040; // if getting error about server already running on this port - https://stackoverflow.com/questions/9898372/how-to-fix-error-listen-eaddrinuse-while-using-nodejs
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
