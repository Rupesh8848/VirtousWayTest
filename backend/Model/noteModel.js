const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

const noteModel = mongoose.model("Note", noteSchema);
module.exports = noteModel;
