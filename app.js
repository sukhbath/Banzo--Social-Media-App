const express = require("express");
const app = express();
const ConnectDb = require("./Utils/ConnectDb");
const ErrorController = require("./Controllers/ERROR_CONTROLLER");
const UserRoute = require("./Routes/USER_ROUTE");
const UserModel = require("./Models/USER_MODEL");

var UserController = require("./Controllers/USER_CONTROLLER");

ConnectDb(
  "mongodb+srv://sukh:sukh@cluster0-7nszg.mongodb.net/Banzo?retryWrites=true&w=majority"
);

app.use(express.json());

app.use("/api/v1/users", UserRoute);

// Posts
// app
//   .route("/api/v1/posts")
//   .get(UserController.getUsers)
//   .post(UserController.createUser);

// app
//   .route("/api/v1/posts/:id")
//   .get(UserController.getUser)
//   .patch(UserController.updateUser)
//   .delete(UserController.deleteUser);

app.use(ErrorController);

app.listen(3000, function () {
  console.log("Server has been started at 3000\n");
});
