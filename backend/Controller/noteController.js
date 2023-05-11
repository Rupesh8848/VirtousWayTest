const noteModel = require("../Model/noteModel");
const userModel = require("../Model/userModel");

const createNewNote = async (req, res) => {
  const { title, note } = req.body;

  console.log(req.user);

  try {
    const newNote = await noteModel.create({
      title,
      note,
      user: req.user?._id,
    });
    return res.send(newNote);
  } catch (error) {
    return res.send(error);
  }
};

const getNotes = async (req, res) => {
  const userId = req.user._id;
  const userData = await userModel.findById(userId).populate("notes");
  const notesTitles = userData.notes.map((note) => ({
    note: note._id,
    title: note.title,
    createdAt: note.createdAt,
  }));
  return res.send(notesTitles);
};

module.exports = { createNewNote, getNotes };
