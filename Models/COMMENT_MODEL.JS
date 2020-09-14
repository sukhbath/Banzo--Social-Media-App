const mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "Must provide user associated to the comment."],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "posts",
    required: [true, "Must provide post associated to the comment."],
  },
  dateModified: { type: Date },
});

CommentSchema.pre(/^find/, async function (next) {
  this.populate({ path: "post", select: "caption" }).populate({
    path: "user",
    select: "username",
  });
  next();
});

var CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;
