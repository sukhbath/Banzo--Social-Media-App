const express = require("express");
var CommentController = require("./../Controllers/COMMENT_CONTROLLER");
const AuntheticationController = require("./../Controllers/AUTHENTICATION_CONTTOLLER");

var router = express.Router({ mergeParams: true });

router.use(AuntheticationController.protectedRoute);

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
