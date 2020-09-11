const express = require("express");
const PostModel = require("./../Models/POST_MODEL");
const CatchError = require("./../Utils/CatchError");
const CommonController = require("./COMMON_CONTROLLER.JS");

exports.createPost = CommonController.createDoc(PostModel);
exports.getPosts = CommonController.getDocs(PostModel);
exports.getPost = CommonController.getDoc(PostModel);
exports.updatePost = CommonController.updateDoc(PostModel);
exports.deletePost = CommonController.deleteDoc(PostModel);
