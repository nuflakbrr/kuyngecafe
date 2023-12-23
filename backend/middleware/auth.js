const jwt = require("jsonwebtoken");
const SECRET_KEY = "UKK_Cafe_Kasir";

auth = (req, res, next) => {
  let header = req.headers.authorization;
  let token = header && header.split(" ")[1];

  let jwtHeader = {
    algorithm: "HS256",
  };

  if (token == null) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    jwt.verify(token, SECRET_KEY, jwtHeader, (error, user) => {
      if (error) {
        res.status(401).json({
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  }
};

module.exports = auth;