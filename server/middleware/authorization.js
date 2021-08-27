const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    const jwtToken = req.headers("token");
    if (!jwtToken) {
      return res.status(403).json("Not authorized");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
  } catch (e) {
    console.error(e.message);
    return res.status(403).json("Not authorized");
  }
};
