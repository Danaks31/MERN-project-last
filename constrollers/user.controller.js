const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  // On recupere les users dans notre BDD sans le password
  const users = await UserModel.find().select("-password");
  // Renvois un code 200 et la data user sous Json
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  // Si l'id est connus dans la base de donné
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    // Si il n'y a pas d'érreur, envois les data
    if (!err) res.send(docs);
    // Sinon log l'érreur
    else console.log("ID unknow : " + err);
  }).select("-password"); // On retire toujours le password ( sécurité )
};

module.exports.updateUser = async (req, res) => {
  // Si l'id est connus dans la base de donné
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    // Rechercher dans la base de donné un utilisateur qui à pour id le même qui est passé en req
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        // Met à jour le parametre 'bio' avec le contenu de la requete bio ( req.body.bio )
        $set: {
          bio: req.body.bio,
        },
      },
      // Parametre obligatoire
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        // Si il n'y a pas d'érreur envois les data du document
        if (!err) return res.send(docs);
        // Si il y a une erreur, envois le message d'erreur
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  // Si il n'y a pas d'utilisateur avec cette Id en bdd
  if (!ObjectID.isValid(req.params.id))
    // retourne le message d'érreur
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    // On surrpime l'utilisateur qui a pour id le même que cleui de la rquete ( req.params.id), puis on execute
    await UserModel.remove({ _id: req.params.id }).exec();
    // On renvois un message au format Json si tout c'est bien passé
    res.status(200).json({ message: "Sucessfully deleted. " });
    // Sinon on 'attrape l'étteur et on la renvois
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  // On vérifie qu'il y ai bien les deux utilisateur en bdd ( le follower et le followed ) Sinon renvois un érreur
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    // Ajouter à la liste de follower
    await UserModel.findByIdAndUpdate(
      req.params.id,
      // $addToSet ajoute la valeur a un tableaux sauf si il existe déjà, sinon fait rien
      { $addToSet: { following: req.body.idToFollow } }, // idToFollow est l'id que l'on va passé en parametre
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    // Ajoute à la liste ' followers ' du user qui a pour id idToFollow
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    // Ajouter à la liste de follower
    await UserModel.findByIdAndUpdate(
      req.params.id,
      // $addToSet ajoute la valeur a un tableaux sauf si il existe déjà, sinon fait rien
      { $pull: { following: req.body.idToUnfollow } }, // idToFollow est l'id que l'on va passé en parametre
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    // Ajoute à la liste ' followers ' du user qui a pour id idToFollow
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
