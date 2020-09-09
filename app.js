const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sukh:sukh@cluster0-7nszg.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(function (v) {
    console.log("::::::::::::::::::::::::::::::::::::::::::::");
    console.log(":::::::::::::DATABASE CONNECTED:::::::::::::");
    console.log("::::::::::::::::::::::::::::::::::::::::::::");
  })
  .catch(function (error) {
    console.log("::::::::::::::::::::::::::::::::::::::::::::");
    console.log(":::::::::DATABASE CONNECTION FAILED:::::::::");
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Banzo App");
});

app.listen(3000, function () {
  console.log("Server has been started at 3000\n");
});
