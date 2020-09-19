const mongoose = require("mongoose");
var emailValidator = require("email-validator");
var validators = require("./../Utils/Validators");
var passwordHash = require("password-hash");
var generator = require("generate-password");

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
  tempPassword: {
    type: String,
    select: false,
  },
  tempPasswordTime: {
    type: Date,
    select: false,
  },
  tempPassword: String,
  pswdChngdAt: Date,
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.pswdChngdAt = Date.now();
    this.password = passwordHash.generate(this.password);
    this.confirmPassword = undefined;
  }
  next();
});

UserSchema.methods.verifyPassword = function (password) {
  return passwordHash.verify(password, this.password);
};

UserSchema.methods.createTempPaswd = async function () {
  var tempPassword = generator.generate({
    length: 7,
    numbers: true,
  });
  this.tempPassword = tempPassword;
  this.tempPasswordTime = Date.now() + 60 * 10 * 1000;
  await this.save();
  return tempPassword;
};

var UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
