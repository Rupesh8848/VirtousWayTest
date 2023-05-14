const noteModel = require("../Model/noteModel");
const userModel = require("../Model/userModel");
const mongoose = require("mongoose");

const createNewNote = async (req, res) => {
  const { title, note } = req.body;

  console.log(req.user);

  try {
    const newNote = await noteModel.create({
      title,
      note,
      user: req.user?._id,
    });
    return res.status(201).send(newNote);
  } catch (error) {
    return res.send(error);
  }
};

const getNotes = async (req, res) => {
  const userId = req.user._id;
  const userData = await userModel
    .findById(userId)
    .sort("-createdAt")
    .populate("notes");
  const notesTitles = userData.notes.map((note) => ({
    note: note._id,
    title: note.title,
    createdAt: note.createdAt,
  }));
  return res.send(notesTitles);
};

const getNote = async (req, res) => {
  const { noteId } = req.params;
  // console.log(id);
  const isValidObjectId = mongoose.isValidObjectId(noteId);
  if (!isValidObjectId) {
    return res.send("Note id is invalid.");
  }
  const note = await noteModel.findById(noteId);
  if (!note) {
    return res.send(`Note with id ${id} doesn't exists.`);
  }
  return res.send(note);
};

const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { note } = req.body;
  try {
    // const noteFromDatabase = await noteModel.findById(noteId);

    // if (noteFromDatabase.user._id !== req?.user?._id) {
    //   return res.status(401).json({
    //     exception: true,
    //     error: "User not authorized for the selected action.",
    //   });
    // }

    const edittedNote = await noteModel.findByIdAndUpdate(noteId, {
      note,
    });
    return res.status(204).send(edittedNote);
  } catch (error) {
    return res.status(500).json({ exception: true, error });
  }
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const deletedItem = await noteModel.findByIdAndDelete(noteId);
    return res.status(200).send("Note deleted successfully.");
  } catch (error) {
    return res.status(500).json({ exception: true, error });
  }
};

module.exports = { createNewNote, getNotes, getNote, updateNote, deleteNote };
