const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";

const withAuth = (req, res, next) => {
  const token = 
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
  
  (!token) ? res.status(401).send("Unauthorized: No token provided") : jwt.verify(token, secret, (err, decoded) => {
    (err) ? res.status(401).send("Unauthorized: Invalid token") : req.email = decoded.email;
  });
}

module.exports = withAuth;

