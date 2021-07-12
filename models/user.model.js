const mongoose = require("mongoose");
// Permet de controler si l'email respecte les contrôle d'un mail
const { isEmail } = require("validator");

// Bicliotheque pour crypté le mdp
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlenght: 3,
      maxlength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlenght: 5,
    },
    bio: {
      type: String,
      max: 1024,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// .pre permet de lancer ceci avant d'enregistré dans la bdd.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  // this fait référence au password dans userSchema
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  // On récupere le user qui corréspond à ce mail
  const user = await this.findOne({ email });
  if (user) {
    // On compare grâce à la fonction compare fournit par bcrypt si password ( passé dans l'appelle au login ) est égal au password trouvé dans le user
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect password");
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
