const express = require("express");
const UserModel = require("./../Models/USER_MODEL");

exports.getUsers = async (req, res) => {
  var allUsers = await UserModel.find();
  res.status(201).send({
    status: "success",
    length: allUsers.length,
    users: allUsers,
  });
};

exports.createUser = async (req, res) => {
  var newUser = await UserModel.create(req.body);
  res.status(201).send({
    status: "created",
    user: newUser,
  });
};
