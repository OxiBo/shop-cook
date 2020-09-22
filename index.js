const express = require("express"),
keys = require("./config/keys"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


// database configuration
try {
    mongoose.connect(keys.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
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


app.get("/", (req, res) => {
  res.send("Running???");
});

const PORT = process.env.PORT || 4455; // if getting error about server already running on this port - https://stackoverflow.com/questions/9898372/how-to-fix-error-listen-eaddrinuse-while-using-nodejs
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
