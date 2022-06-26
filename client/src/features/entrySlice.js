import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

//submitEntry - POST
export const submitEntry = createAsyncThunk(
  "submitEntry/POST",
  async (entryObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/submitentry", entryObj, config);
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
const submitSlice = createSlice({
  name: "submitSlice",
  initialState: {
    loading: "",
    error: "",
  },
  reducers: {
    submitReset: (state, action) => {
      state.loading = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //profileCheck
    builder.addCase(submitEntry.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(submitEntry.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(submitEntry.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
  },
});

export const { submitReset } = submitSlice.actions;

export default submitSlice.reducer;
