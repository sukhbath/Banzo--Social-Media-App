const express = require("express");
var UserController = require("./../Controllers/USER_CONTROLLER");

var router = express.Router();

router.route("/").get(UserController.getUsers).post(UserController.createUser);

router
  .route("/:id")
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
