import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../Slices/noteSlice";

export default function RightPaneHeader({
  title,
  noteId,
  setEditEnable,
  editEnable,
}) {
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setDeleteAlert(false);
  };

  const handleEditButtonClick = () => {
    setEditEnable();
    console.log("Edit button clicked!");
  };

  const handleDeleteButtonClick = () => {
    setDeleteAlert(true);
    // console.log("handle delete button click");
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(noteId));
  };

  return (
    <section className="flex justify-between my-5">
      <div className="flex items-baseline">
        <Typography variant="h4">{title} </Typography>
        {editEnable && (
          <Typography variant="subtitle1"> (Editing...)</Typography>
        )}
      </div>
      <div>
        <ButtonGroup>
          <Tooltip title="Edit note">
            <Button onClick={handleEditButtonClick}>
              <EditNoteIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Delete note">
            <Button onClick={handleDeleteButtonClick}>
              <DeleteIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <Dialog
        open={deleteAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Delete a note?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete a note with title '${title}'`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              handleClose();
              handleDeleteNote();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
