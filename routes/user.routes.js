// Stock le Router de express
const router = require("express").Router();

const authController = require("../constrollers/auth.controller");
const userController = require("../constrollers/user.controller");
const uploadController = require("../constrollers/upload.controller");
// Bibliotheque upload d'image
const multer = require("multer");
const upload = multer();

// authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// On execute la function getAllUsers de l'api userController quand l'url est /
// Get permet de 'read'
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
// Put permet de mettre à jour
router.put("/:id", userController.updateUser);
// Delete permet de supprimer :D
router.delete("/:id", userController.deleteUser);
// Pour mettre à jour partiellement ( exemple ajouter un fellower au tableau sans enlever le reste )
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

// On export le fichier pour pouvoir y accèder aileurs
module.exports = router;
