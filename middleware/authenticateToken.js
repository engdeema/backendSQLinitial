const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const User = require("../models/User");

const authenticateToken = (req, res, next) => {
  // extracting authorization header from the req
  const authHeader = req.headers["authorization"];
  // we we are splitting to represents: barear "space" token
  const token = authHeader && authHeader.split(" ")[1];
  // we are cheking if the token does not exists
  if (!token) {
    return res.status(403).json({ error: "sorry you are not logged in" });
  }
  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "invalid token" });
    }
    const findUser = await User.findById(user._id);
    req.user = findUser;
    next();
  });
};

module.exports = authenticateToken;
