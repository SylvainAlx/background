import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: Boolean,
    },
    {
        timestamps: true,
    }
);

//cryptage du mot de passe avant chaque save qui modifie le mdp
userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    const user = this.model.findOne(this.getQuery());
  
    // Si le mot de passe n'a pas été modifié, on passe au middleware suivant
    if (!update.password) {
      return next();
    }
  
    // On génère un salt pour crypter le mot de passe
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
  
      // On crypte le mot de passe avec le salt
      bcrypt.hash(update.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
  
        // On remplace le mot de passe en clair par le hash dans l'objet de mise à jour
        update.password = hash;
        next();
      });
    });
  });

//methode pour vérifier que le mot de passe envoyé correspond à celui de la BDD
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
//création du JWT pour le login et le register
userSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};

export default mongoose.model("User", userSchema);
