const express = require("express");
var PostController = require("./../Controllers/POST_CONTROLLER");
const CommentRoute = require("./../Routes/COMMENT_ROUTE");

var router = express.Router();

router.route("/").get(PostController.getPosts).post(PostController.createPost);

router
  .route("/:id")
  .get(PostController.getPost)
  .patch(PostController.updatePost)
  .delete(PostController.deletePost);

router.use("/:post/comments", CommentRoute);

module.exports = router;
