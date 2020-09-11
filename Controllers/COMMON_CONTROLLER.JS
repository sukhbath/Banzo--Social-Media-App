const express = require("express");
const CatchError = require("./../Utils/CatchError");

exports.createDoc = (Model) =>
  CatchError(async function (req, res, next) {
    var newDoc = await Model.create(req.body);
    newDoc.password = undefined;
    res.status(201).send({
      status: "created",
      data: newDoc,
    });
  });

exports.getDocs = (Model) =>
  CatchError(async function (req, res, next) {
    var allDocs = await Model.find();
    res.status(200).send({
      status: "success",
      length: allDocs.length,
      data: allDocs,
    });
  });

exports.getDoc = (Model) =>
  CatchError(async function (req, res, next) {
    var doc = await Model.findById(req.params.id);
    res.status(200).send({
      status: "success",
      data: doc,
    });
  });

exports.updateDoc = (Model) =>
  CatchError(async function (req, res, next) {
    var { username, email, firstName, lastName, age, gender } = req.body;
    var newInfo = { username, email, firstName, lastName, age, gender };
    var updatedDoc = await Model.findByIdAndUpdate(req.params.id, newInfo, {
      new: true,
    });
    res.status(200).send({
      status: "success",
      data: updatedDoc,
    });
  });

exports.deleteDoc = (Model) =>
  CatchError(async function (req, res, next) {
    var deletedDoc = await Model.findByIdAndDelete(req.params.id);
    res.status(204).send({
      status: "success",
    });
  });
