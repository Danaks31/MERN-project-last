// Permet de récuperer le dossier .env
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");
// Import de express
const express = require("express");
const app = express();

// ===== CORS ====
// Seulement la partie client de notre site pourras requêter, sinon n'importe qui peut le faire
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
// cookieParser permet de lire les cookies
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

//====
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
// A chaque requete get, vérifie si l'utilsateur loggé a bien un token de sécurité
app.get("*", checkUser);
// Ne sera utiliser qu'une seule fois quand l'utilisateur arrive sur la page du site, vérifiera son token et si il en a un, le loggera automatiquement
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// Quand il y aura une requête /api/user
app.use("/api/user", userRoutes);
app.use("/api/post/", postRoute);
// Grâce à process.env.PORT on accède à la variable PORT déclarer dans .env
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
