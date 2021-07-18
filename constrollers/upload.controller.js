const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
  // On vérifie le format du fichier
  console.log("testr", req.file);
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 5000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    console.error("ERROR", err);
    return res.status(401).json({ errors });
  }
  const fileName = req.body.name + ".jpg";
  console.log("fileName", fileName);

  // On passe en argument
  const path = `${__dirname}/../client/public/uploads/profil/${fileName}`;
  await pipeline(req.file.stream, fs.createWriteStream(path));
  res.send("File uploaded as " + fileName);
};
