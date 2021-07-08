const UserModel = require("../models/user.model");
require("dotenv").config({ path: "./config/.env" });
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    // La clé éxpire dans 24h ( calcule en milliseconde )
    expiresIn: maxAge,
  });
};
module.exports.signUp = async (req, res) => {
  // Pour créé un utilisateur, pseudo, email et password sont obligatoire
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    console.log(req.body);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    // Créé un token de sécurité qui contient l'id de l'user + la clé secrete de jsonwebtoken
    const token = createToken(user._id);

    // L’utilisation de l’instruction “HttpOnly” empêche d’accéder aux cookies en Javascript :
    // si malgré les protections, un attaquant venait à injecter du Javascript, les cookies ne seront pas accessibles, ce qui limitera la portée de l’attaque
    // Argument 1 : Nom, Argument 2 la Valeur ( ici le token créé par la fonction déclarer plus haut ) Argument 3 : Option, ici le temp ou le cookie seras stocké
    // Notre token contiendra donc l'id de l'utilisateur ainsi que notre clé secrete et jwt va le "crypté"
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.logout = (req, res) => {
  // Etant donner que l'utilisateur a besoin du token contenant sa clé secrete pour être connecter, il suffit d'éffacer cette clé et de mettre maxAge sur 1 milliseconde pour qu'il expire dessuite
  res.cookie("jwt", "", { maxAge: 1 });
  // On doit faire une redirection sinon cela ne fonctionne pas
  res.redirect("/");
};
