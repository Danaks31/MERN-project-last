const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// Permet de vérifier si l'utilisateur est connecter, sinon éfface le cookie token
// Les middleware interviennet au milieu d'une requete 'middle'
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // Method verify fournis pas jwt
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // Reset l'utilisateur
        res.locals.user = null;
        // Reset le cookies
        res.cookie("jwt", "", { maxAge: 1 });
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        console.log("checkUser : " + decodedToken.id);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log("requireAuth : " + decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
