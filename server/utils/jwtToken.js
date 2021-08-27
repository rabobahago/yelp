const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };
  return jsonwebtoken.sign(payload, process.env.jwtSecret, {
    expiresIn: "1hour",
  });
};

module.exports = jwtGenerator;
