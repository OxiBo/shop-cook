// key.js figure out what set of credentials to use


if (process.env.NODE_ENV === "production") {
    // we are in production
    // console.log(process.env.NODE_ENV)
    module.exports = require("./prod");
  } else {
    // we are in development
    console.log(process.env.NODE_ENV)
    module.exports = require("./dev");
  }
  