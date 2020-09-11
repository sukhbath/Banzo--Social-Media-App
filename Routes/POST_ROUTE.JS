const express = require("express");
var PostController = require("./../Controllers/POST_CONTROLLER");

var router = express.Router();

router.route("/").get(PostController.getPosts).post(PostController.createPost);

router
  .route("/:id")
  .get(PostController.getPost)
  .patch(PostController.updatePost)
  .delete(PostController.deletePost);

module.exports = router;
