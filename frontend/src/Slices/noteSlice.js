import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import { toast } from "react-toastify";

export const getAllNoteTitle = createAsyncThunk(
  "get/noteTitle",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState()?.user?.userData;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(token);
      const response = await axios.get(`${baseUrl}note/all`, config);
      console.log(response.data);
      const titles = response.data;
      return titles;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createNewNote = createAsyncThunk(
  "create/newNote",
  async (noteData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState()?.user?.userData;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // console.log(token);
      const response = await axios.post(
        `${baseUrl}note/create/new`,
        noteData,
        config
      );
      //   console.log(response.data);

      if (response.status === 201) {
        toast("Note created successfully.");
        setTimeout(() => {
          window.location.pathname = `note`;
        }, 2000);
      } else {
        toast("Problem Creating Note.");
      }

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getSelectedNote = createAsyncThunk(
  "get/note",
  async (noteId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState()?.user?.userData;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(token);
      const response = await axios.get(`${baseUrl}note/${noteId}`, config);
      console.log(response.data);
      const note = response.data;
      return note;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateNote = createAsyncThunk(
  "update/note",
  async (noteData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState()?.user?.userData;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(token);
      const response = await axios.put(
        `${baseUrl}note/${noteData?.noteId}`,
        { note: noteData?.note },
        config
      );
      console.log(response.data);
      const note = response.data;
      if (response.status === 204) {
        toast("Note updated successfully.");
        setTimeout(() => {
          window.location.pathname = `note`;
        }, 2000);
      }
      return note;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "delete/note",
  async (noteId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState()?.user?.userData;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(token);
      const response = await axios.delete(`${baseUrl}note/${noteId}`, config);
      if (response.status === 200) {
        toast(response.data);
        setTimeout(() => {
          window.location.pathname = `note`;
        }, 2000);
      } else if (response.status === 500) {
        toast("Error deleting note. Please try again.");
      }
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const noteSlice = createSlice({
  name: "Note",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNoteTitle.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllNoteTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.noteTitles = action.payload;
        state.appErr = undefined;
        state.serveErr = undefined;
      })
      .addCase(getAllNoteTitle.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      })
      .addCase(createNewNote.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewNote.fulfilled, (state, action) => {
        state.loading = false;
        state.appErr = undefined;
        state.serveErr = undefined;
      })
      .addCase(createNewNote.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      })
      .addCase(getSelectedNote.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSelectedNote.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action?.payload;
        state.appErr = undefined;
        state.serveErr = undefined;
      })
      .addCase(getSelectedNote.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      })
      .addCase(updateNote.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action?.payload;
        state.appErr = undefined;
        state.serveErr = undefined;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      })
      .addCase(deleteNote.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.appErr = undefined;
        state.serveErr = undefined;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      });
  },
});

export default noteSlice.reducer;
