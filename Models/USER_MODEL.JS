const mongoose = require("mongoose");
var emailValidator = require("email-validator");
var validators = require("./../Utils/Validators");
var passwordHash = require("password-hash");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must provide username"],
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: [true, "User must provide first name"],
    lowercase: true,
  },
  lastName: {
    type: String,
    required: [true, "User must provide last name"],
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User must provide email"],
    lowercase: true,
    validate: {
      validator: (email) => emailValidator.validate(email),
      message: (obj) => `${obj.value} is not valid email.`,
    },
  },
  gender: {
    type: String,
    lowercase: true,
    required: [true, "User must provide gender"],
    enum: ["male", "female", "other"],
  },
  age: {
    type: Number,
    required: [true, "User must provide age"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "User must provide password"],
    validate: {
      validator: (pswd) => validators.schema.validate(pswd),
      message: (obj) => `Choose Strong Password`,
    },
  },
  confirmPassword: {
    type: String,
    select: false,
    required: [true, "User must confirm password"],
    validate: {
      validator: function (pswd) {
        return this.password == pswd;
      },
      message: (obj) => `Password does not matches`,
    },
  },
});

UserSchema.pre("save", function (next) {
  this.password = passwordHash.generate(this.password);
  this.confirmPassword = undefined;
  next();
});

var UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
