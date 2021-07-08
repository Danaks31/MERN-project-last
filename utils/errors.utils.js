module.exports.signUpErrors = (err) => {
  let errors = {
    pseudo: "",
    email: "",
    password: "",
  };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "email incorrect";

  if (err.message.includes("password"))
    errors.password =
      "Mot de passe incorrect ( doit contenir plus de 6 caracteres )";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = {
    errorMessage: "",
  };

  if (err.message.includes("email") || err.message.includes("password"))
    errors.errorMessage = "Email Inconnus ou mauvais mot de passe";

  //   if (err.message.includes("password"))
  //     errors.password = "Le mot de passe ne corréspond pas";
  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid files"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";
};
