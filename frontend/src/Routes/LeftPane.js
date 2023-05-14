import { Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSelectedNote } from "../Slices/noteSlice";

export default function LeftPane() {
  const notesTitleObj = useSelector((state) => state?.note?.noteTitles);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateNewNote = () => {
    navigate("/note/new");
  };

  const handleNoteClick = (noteId) => {
    dispatch(getSelectedNote(noteId));
  };

  return (
    <>
      <div
        className="bg-gray-200 hover:bg-gray-400 h-[3rem] hover:cursor-pointer rounded-3xl flex items-center justify-center w-[15rem] mx-auto mt-5 mb-2"
        onClick={handleCreateNewNote}
      >
        Create a new note
      </div>
      <div className="flex flex-col ">
        {notesTitleObj?.map((titleObj) => (
          <div
            onClick={() => handleNoteClick(titleObj?.note)}
            key={titleObj?.note}
          >
            <ListItem key={titleObj?.note} component="div" disablePadding>
              <ListItemButton>
                <ListItemText primary={titleObj?.title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
}
