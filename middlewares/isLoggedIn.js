module.exports = (req, res, next) => {
  if (!req.user) {
    res.status().send({ message: "You are not authorized" });
  }
  next();
};
