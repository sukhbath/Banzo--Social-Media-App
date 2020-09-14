const express = require("express");
var CommentController = require("./../Controllers/COMMENT_CONTROLLER");
var router = express.Router();

router
  .route("/")
  .get(CommentController.getComments)
  .post(CommentController.createComment);

router
  .route("/:id")
  .get(CommentController.getComment)
  .patch(CommentController.updateComment)
  .delete(CommentController.deleteComment);

module.exports = router;
