const express = require("express");
const CommentModel = require("./../Models/COMMENT_MODEL");
const CatchError = require("./../Utils/CatchError");
const CommonController = require("./COMMON_CONTROLLER.JS");

exports.createComment = CommonController.createDoc(CommentModel);
exports.getComments = CommonController.getDocs(CommentModel);
exports.getComment = CommonController.getDoc(CommentModel);
exports.updateComment = CommonController.updateDoc(CommentModel);
exports.deleteComment = CommonController.deleteDoc(CommentModel);
