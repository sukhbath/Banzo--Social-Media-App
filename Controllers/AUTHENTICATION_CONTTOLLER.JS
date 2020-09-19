const express = require("express");
const CatchError = require("./../Utils/CatchError");
const UserModel = require("./../Models/USER_MODEL");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const CustomError = require("../Utils/CustomError");
var utils = require("util");
const Email = require("./../Utils/Email");

function SendToken(res, user, message, statusCode) {
  var token = jwt.sign({ id: user.id }, process.env.SALT_KEY, {
    expiresIn: "10d",
  });
  user.password = undefined;
  res.cookie("jwt", token);
  res.status(statusCode).send({
    status: "success",
    message,
    data: user,
    token,
  });
}

exports.login = CatchError(async function (req, res, next) {
  var { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Must provide email and password.", 400));
  }

  var user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new CustomError("User does not exists with provided email.", 400)
    );
  }

  if (!user.verifyPassword(password, user.password)) {
    next(new CustomError("Must provide correct password to login.", 400));
  }

  SendToken(res, user, "Logged in Successfully", 200);

  Email(user.email, user.firstName + "Welcome again", "Logged in Successfully");
});

exports.signup = CatchError(async function (req, res, next) {
  var newUser = await UserModel.create(req.body);
  var token = jwt.sign({ id: newUser.id }, process.env.SALT_KEY);
  SendToken(res, newUser, "Signed up Successfully", 201);
  Email(
    newUser.email,
    newUser.firstName + "Welcome to Banzo",
    "Signed up Successfully"
  );
});

exports.updatePassword = CatchError(async function (req, res, next) {
  var { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword)
    return next(new CustomError("Must provide all fields."));

  var user = await UserModel.findById(req.user.id).select("+password");

  if (!user) return next(new CustomError("User not found"));

  if (!(await user.verifyPassword(oldPassword))) {
    return next(
      new CustomError("Must provide correct password to update password.", 400)
    );
  }
  user.password = newPassword;
  user.confirmPassword = confirmPassword;
  await user.save();

  SendToken(res, user, "password updated Successfully", 200);

  next();
});

exports.forgetPassword = CatchError(async function (req, res, next) {
  var { email } = req.body;
  if (!email) {
    return next(new CustomError("Must provide email.", 400));
  }
  var user = await UserModel.findOne({ email });
  if (!user) return next(new CustomError("User not found"));

  var tempPassword = await user.createTempPaswd();

  res.send({
    status: "success",
    tempPassword,
  });

  next();
});

exports.resetPassword = CatchError(async function (req, res, next) {
  var { tempPassword, newPassword, confirmPassword } = req.body;
  if (!tempPassword || !newPassword || !confirmPassword) {
    return next(new CustomError("Must provide all fields.", 400));
  }
  var user = await UserModel.findOne({
    tempPassword,
    tempPasswordTime: { $gte: Date.now() },
  });
  if (!user) return next(new CustomError("User not found"));

  user.password = newPassword;
  user.confirmPassword = confirmPassword;

  user.tempPassword = undefined;
  user.tempPasswordTime = undefined;
  await user.save();

  res.send({
    status: "success",
    message: "Password updated successfully",
  });

  next();
});

exports.protectedRoute = CatchError(async function (req, res, next) {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.jwt;
  }
  if (!token) return next(new CustomError("Please login to get access.", 401));
  var varify = utils.promisify(jwt.verify);
  var data = await varify(token, process.env.SALT_KEY);

  var user = await UserModel.findById(data.id);

  if (!user) return next(new CustomError("User doesn't exist now."));
  console.log(data.iat * 1000, user.pswdChngdAt * 1);
  if (data.iat * 1000 < user.pswdChngdAt * 1)
    return next(
      new CustomError("User has changed the password, login again.", 401)
    );

  req.user = user;
  next();
});
