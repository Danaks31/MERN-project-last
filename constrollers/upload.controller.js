const UserModel = require("../models/user.model");
const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);
// const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
  // On vérifie le format du fichier
  console.log("testr");
  //   try {
  //     console.log(req.file);
  //     if (
  //       req.file.detectedMimeType !== "image/jpg" &&
  //       req.file.detectedMimeType !== "image/png" &&
  //       req.file.detectedMimeType !== "image/jpeg"
  //     )
  //       throw Error("invalid file");

  //     if (req.file.size > 500000) throw Error("max size");
  //   } catch (err) {
  //     const errors = uploadErrors(err);
  //     return res.status(201).json({ errors });
  //   }
  //   const fileName = req.body.name + ".jpg";

  // On passe en argument
  //   await pipeline(
  //     req.file.stream,
  //     fs.createWriteStream(
  //       `${__dirname}/../client/public/uploads/profil/${fileName}`
  //     )
  //   );
  //   res.send("File uploaded ad " + fileName);
};
