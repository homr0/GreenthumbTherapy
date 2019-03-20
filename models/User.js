const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true 
  },

  password: {
    type: String,
    required: true
  },

  plants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant"
  }]
});

UserSchema.pre("save", function(next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
      if(err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);