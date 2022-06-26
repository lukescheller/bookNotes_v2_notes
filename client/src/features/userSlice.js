import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// signUp - POST
export const signUp = createAsyncThunk(
  "signUp/POST",
  async (userObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/signup", userObj, config);
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

// signIn - POST
export const signIn = createAsyncThunk(
  "signIn/POST",
  async (userObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/signin", userObj, config);
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

// homeCheck - POST
export const homeCheck = createAsyncThunk(
  "homeCheck/POST",
  async (cookie, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/home", cookie, config);
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

// profileCheck - POST
export const profileCheck = createAsyncThunk(
  "profileCheck/POST",
  async (cookie, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/profile", cookie, config);
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

// deleteComment - DELETE
export const deleteComment = createAsyncThunk(
  "deleteComment/DELETE",
  async (obj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/deleteentry", obj, config);
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
const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    data: {},
    userLoggedIn: false,
    loading: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //signup
    builder.addCase(signUp.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.data = action.payload;
      state.userLoggedIn = true;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.data = {};
      state.userLoggedIn = false;
      state.loading = "error";
      state.error = action.payload;
    });
    //signin
    builder.addCase(signIn.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.userLoggedIn = true;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.data = {};
      state.userLoggedIn = false;
      state.loading = "error";
      state.error = action.payload;
    });
    //homeCheck
    builder.addCase(homeCheck.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(homeCheck.fulfilled, (state, action) => {
      state.data = action.payload;
      state.userLoggedIn = true;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(homeCheck.rejected, (state, action) => {
      state.data = {};
      state.userLoggedIn = false;
      state.loading = "error";
      state.error = action.payload;
    });
    //profileCheck
    builder.addCase(profileCheck.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(profileCheck.fulfilled, (state, action) => {
      state.data = action.payload;
      state.userLoggedIn = true;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(profileCheck.rejected, (state, action) => {
      state.data = {};
      state.userLoggedIn = false;
      state.loading = "error";
      state.error = action.payload;
    });
    //deleteComment
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.data = action.payload;
      state.userLoggedIn = true;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.data = {};
      state.userLoggedIn = false;
      state.loading = "error";
      state.error = action.payload;
    });
  },
});

export default mainSlice.reducer;
