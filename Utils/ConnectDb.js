const mongoose = require("mongoose");

module.exports = function (dbLink) {
  mongoose
    .connect(dbLink, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
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
};
