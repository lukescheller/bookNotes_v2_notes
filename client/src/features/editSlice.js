import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// editComment - POST
export const editComment = createAsyncThunk(
  "editComment/POST",
  async (commentObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/editentry", commentObj, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//mainSlice
const editSlice = createSlice({
  name: "editSlice",
  initialState: {
    loading: "",
    error: "",
  },
  reducers: {
    editReset: (state, action) => {
      state.loading = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //editComment
    builder.addCase(editComment.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(editComment.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
  },
});

export const { editReset } = editSlice.actions;

export default editSlice.reducer;
