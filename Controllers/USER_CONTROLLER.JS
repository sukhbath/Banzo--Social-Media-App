const express = require("express");
const UserModel = require("./../Models/USER_MODEL");
const CatchError = require("./../Utils/CatchError");
const CommonController = require("./COMMON_CONTROLLER.JS");

exports.createUser = CommonController.createDoc(UserModel);
exports.getUsers = CommonController.getDocs(UserModel);
exports.getUser = CommonController.getDoc(UserModel);
exports.updateUser = CommonController.updateDoc(UserModel);
exports.deleteUser = CommonController.deleteDoc(UserModel);
