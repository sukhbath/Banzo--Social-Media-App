const express = require("express");
var CommentController = require("./../Controllers/COMMENT_CONTROLLER");
var router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(function (req, res, next) {
    req.body.filterObj = { post: req.params.post };
    console.log(req.body.filterObj);
    next();
  }, CommentController.getComments)
  .post(CommentController.createComment);

router
  .route("/:id")
  .get(function (req, res, next) {
    req.body.filterObj = { post: req.params.post };
    console.log(req.body.filterObj);
    next();
  }, CommentController.getComment)
  .patch(CommentController.updateComment)
  .delete(CommentController.deleteComment);

module.exports = router;
