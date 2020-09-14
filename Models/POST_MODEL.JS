const mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  media: {
    type: String,
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "Must provide user associated to the post."],
  },
  dateUploaded: {
    type: Date,
    required: [true, "Date required"],
    default: new Date(),
  },
  dateModified: { type: Date },
  // likes: [mongoose.Types.ObjectId], in user section
});

PostSchema.pre(/^find/, async function (next) {
  this.populate({ path: "user", select: "username" });
  next();
});

var PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
