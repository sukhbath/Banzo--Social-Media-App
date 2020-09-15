const express = require("express");
var UserController = require("./../Controllers/USER_CONTROLLER");
const UserModel = require("./../Models/USER_MODEL");
const CustomError = require("./../Utils/CustomError");
const AuntheticationController = require("./../Controllers/AUTHENTICATION_CONTTOLLER");

var router = express.Router();

router.route("/").get(UserController.getUsers).post(UserController.createUser);

router.post("/signup", AuntheticationController.signup);
router.post("/login", AuntheticationController.login);

router
  .route("/:id")
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
