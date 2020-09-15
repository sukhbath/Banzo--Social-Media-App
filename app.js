const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ConnectDb = require("./Utils/ConnectDb");
const ErrorController = require("./Controllers/ERROR_CONTROLLER");
const UserRoute = require("./Routes/USER_ROUTE");
const PostRoute = require("./Routes/POST_ROUTE");
const UserModel = require("./Models/USER_MODEL");
var UserController = require("./Controllers/USER_CONTROLLER");
dotenv.config();

ConnectDb(process.env.DB_URL);

app.use(express.json());

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/posts", PostRoute);

app.use(ErrorController);

app.listen(3000, function () {
  console.log("Server has been started at 3000\n");
});
