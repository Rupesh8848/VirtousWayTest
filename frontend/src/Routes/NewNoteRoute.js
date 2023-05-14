import { Button, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createNewNote } from "../Slices/noteSlice";
import { ToastContainer } from "react-toastify";
export default function NewNoteRoute() {
  const [noteData, setNoteData] = React.useState({ title: "", note: "" });

  const dispatch = useDispatch();

  const handleChange = (content, delta, source, editor) => {
    // console.log(editor.getContents());
    setNoteData((oldData) => ({ ...oldData, note: content }));
  };

  const handleTitleChange = (event) => {
    setNoteData((oldData) => ({
      ...oldData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <section className="flex justify-center mt-[1rem] text-center h-[85vh] ">
        <Paper className="w-[95%] pt-[1rem]">
          <Stack spacing={3} className="mx-[5%]">
            <div>
              <TextField
                label="Enter Your Note Title Here"
                variant="standard"
                size="large"
                className="w-full"
                name="title"
                onChange={handleTitleChange}
                value={noteData.title}
              />
            </div>
            <div>
              <ReactQuill
                theme="snow"
                value={noteData.note}
                name="note"
                onChange={(content, delta, source, editor) =>
                  handleChange(content, delta, source, editor)
                }
              />
            </div>
          </Stack>
          <div className="text-left ml-[5%] mt-[0.6rem]">
            <Button
              variant="contained"
              disabled={noteData.title.length > 1 ? false : true}
              onClick={() => dispatch(createNewNote(noteData))}
            >
              Create note
            </Button>
          </div>
        </Paper>
      </section>
    </>
  );
}
