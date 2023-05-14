import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RightPaneHeader from "./RightPaneHeader";
import ReactQuill from "react-quill";
import { Button } from "@mui/material";
import { updateNote } from "../Slices/noteSlice";

export default function RightPane() {
  const currentNote = useSelector((state) => state?.note?.currentNote);

  const containsNote = useSelector((state) => state?.note?.noteTitles);

  const [editEnable, setEditEnable] = React.useState(false);

  const [edittedContent, setEdittedContent] = React.useState();

  const dispatch = useDispatch();

  const handleChange = (content, delta, source, editor) => {
    setEdittedContent(content);
  };

  React.useEffect(() => {
    setEdittedContent(currentNote?.note);
    // console.log("Right pane useeffect troggered.");
  }, [currentNote]);

  return containsNote?.length < 1 ? (
    <div>
      Oops!! seems like you don't have any note. You can add a note by clicking
      on "Create a new note" on the left side of the screen.
    </div>
  ) : (
    currentNote && (
      <section className="mx-5">
        <RightPaneHeader
          title={currentNote?.title}
          noteId={currentNote?._id}
          setEditEnable={() => setEditEnable((oldState) => !oldState)}
          editEnable={editEnable}
        />
        <div>
          <ReactQuill
            readOnly={!editEnable}
            theme="snow"
            value={edittedContent}
            name="note"
            onChange={(content, delta, source, editor) =>
              handleChange(content, delta, source, editor)
            }
          />
        </div>
        <div className="flex flex-row-reverse mr-[5rem] mt-[2rem]">
          {edittedContent !== currentNote?.note && (
            <Button
              variant="contained"
              onClick={() => {
                dispatch(
                  updateNote({ noteId: currentNote?._id, note: edittedContent })
                );
              }}
            >
              Save Edit
            </Button>
          )}
        </div>
      </section>
    )
  );
}
