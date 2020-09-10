const express = require("express");
const UserModel = require("./../Models/USER_MODEL");
const CatchError = require("./../Utils/CatchError");

exports.createUser = CatchError(async function (req, res, next) {
  var newUser = await UserModel.create(req.body);
  newUser.password = undefined;
  res.status(201).send({
    status: "created",
    user: newUser,
  });
});

exports.getUsers = CatchError(async function (req, res, next) {
  var allUsers = await UserModel.find();
  res.status(200).send({
    status: "success",
    length: allUsers.length,
    users: allUsers,
  });
});

exports.getUser = CatchError(async function (req, res, next) {
  var user = await UserModel.findById(req.params.id);
  res.status(200).send({
    status: "success",
    user,
  });
});

exports.updateUser = CatchError(async function (req, res, next) {
  var { username, email, firstName, lastName, age, gender } = req.body;
  var newInfo = { username, email, firstName, lastName, age, gender };
  var updatedUser = await UserModel.findByIdAndUpdate(req.params.id, newInfo, {
    new: true,
  });
  res.status(200).send({
    status: "success",
    updatedUser,
  });
});

exports.deleteUser = CatchError(async function (req, res, next) {
  var deletedUser = await UserModel.findByIdAndDelete(req.params.id);
  res.status(204).send({
    status: "success",
  });
});
