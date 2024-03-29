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

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  plants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant"
  }],

  banned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant"
  }],

  preferred_room: [{
    type: String
  }],

  preferred_sunlight: {
    type: String
  },

  preferred_water: {
    type: String
  },

  pets: [{
    type: String
  }],

  allergy: {
    type: Boolean
  }
});

UserSchema.pre("save", function(next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
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

UserSchema.methods.hashedPassword = function(password) {
  return bcrypt.hash(password, saltRounds);
}

module.exports = mongoose.model("User", UserSchema);