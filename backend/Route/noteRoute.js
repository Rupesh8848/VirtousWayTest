const express = require("express");
const { createNewNote, getNotes } = require("../Controller/noteController");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const noteRoute = express.Router();

const noteSchema = Joi.object({
  title: Joi.string().required(),
  note: Joi.string().required(),
});

noteRoute.post("/create/new", validator.body(noteSchema), createNewNote);
noteRoute.get("/note/all", getNotes);

module.exports = noteRoute;
