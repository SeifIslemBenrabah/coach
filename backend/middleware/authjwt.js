const jwt = require('jsonwebtoken');
require('dotenv').config(); 
function Authjwt() {
  return (req, res, next) => {
    const Authheader = req.headers['authorization'];
    const token = Authheader && Authheader.split(' ')[1];

    if (token == null) {
      return res.status(401).send('Token not provided');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      req.user = user;
      next();
    });
  };
}

module.exports = Authjwt;
