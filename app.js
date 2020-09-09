const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Banzo App");
});

app.listen(3000, function () {
  console.log("Server has been started at 3000");
});
