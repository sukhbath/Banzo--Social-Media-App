const mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must provide name"],
  },
  email: {
    type: String,
    required: [true, "User must provide email"],
    validate: {
      validator: function (v) {
        console.log(v);
      },
      message: function (v) {
        console.log(v + "i am message");
      },
    },
  },
});

var UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
