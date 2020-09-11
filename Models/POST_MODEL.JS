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
    type: mongoose.Types.ObjectId,
    required: [true, "Must provide user associated to the post."],
  },
  dateUploaded: {
    type: Date,
    required: [true, "Date required"],
    default: new Date(),
  },
  dateModified: Date,
  likes: [mongoose.Types.ObjectId],
  required: [true, "Post modified date required"],
});

var PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
