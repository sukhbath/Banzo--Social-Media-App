const express = require("express");
const CatchError = require("./../Utils/CatchError");
const UserModel = require("./../Models/USER_MODEL");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const CustomError = require("../Utils/CustomError");
const Email = require("./../Utils/Email");

function SendToken(res, user, message, statusCode) {
  var token = jwt.sign({ id: user.id }, process.env.SALT_KEY, {
    expiresIn: "100000",
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
    return next(new CustomError("Must provide email and password."));
  }

  var user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new CustomError("User does not exists with provided email."));
  }

  if (!passwordHash.verify(password, user.password)) {
    next(new CustomError("Must provide correct password to login."));
  }
  SendToken(res, user, "Logged in Successfully", 200);

  Email(
    newUser.email,
    newUser.firstName + "Welcome again",
    "Logged in Successfully"
  );
});

exports.signup = CatchError(async function (req, res, next) {
  var newUser = await UserModel.create(req.body);
  var token = jwt.sign({ id: newUser.id }, process.env.SALT_KEY);
  res.cookie("jwt", token);
  SendToken(res, newUser, "Signed up Successfully", 201);
  Email(
    newUser.email,
    newUser.firstName + "Welcome to Banzo",
    "Signed up Successfully"
  );
});

exports.updatePassword = CatchError(async function (req, res, next) {
  var user = await UserModel.findOne(req.body.email);
  if (!user) return next(new CustomError("User not found"));

  res.cookie("jwt", token);
  SendToken(res, newUser, "Signed up Successfully", 200);
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

  next();
});
