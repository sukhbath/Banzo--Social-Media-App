const express = require("express");
const app = express();
const UserModel = require("./Models/USER_MODEL");
const ConnectDb = require("./Utils/ConnectDb");

var UserController = require("./Controllers/USER_CONTROLLER");

ConnectDb(
  "mongodb+srv://sukh:sukh@cluster0-7nszg.mongodb.net/<dbname>?retryWrites=true&w=majority"
);

app.use(express.json());

app
  .route("/api/v1/users")
  .get(UserController.getUsers)
  .post(UserController.createUser);

app.listen(3000, function () {
  console.log("Server has been started at 3000\n");
});
