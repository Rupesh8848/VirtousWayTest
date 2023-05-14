const express = require("express");
const {
  createNewNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../Controller/noteController");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const noteRoute = express.Router();

const noteSchema = Joi.object({
  title: Joi.string().required(),
  note: Joi.string().required(),
});

noteRoute.post("/create/new", validator.body(noteSchema), createNewNote);
noteRoute.get("/all", getNotes);
noteRoute.get("/:noteId", getNote);
noteRoute.put("/:noteId", updateNote);
noteRoute.delete("/:noteId", deleteNote);

module.exports = noteRoute;
