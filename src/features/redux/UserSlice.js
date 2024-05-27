import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initState = {
  loader: true,
  boards: [],
  areBoardsFetched: false,
  isLoggedIn: false,
  toastrMsg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
      state.loader = false;
      state.boards = [];
      state.areBoardsFetched = false;
    },
    setBoard(state, action) {
      state.boards = action.payload;
      state.areBoardsFetched = true;
    },
    addBoard(state, action) {
      state.boards = [action.payload, ...state.boards];
    },
    setToaster(state, action) {
      state.toastrMsg = action.payload;
    },
  },
});

export const { setLoginState, setBoard, addBoard, setToaster } =
  userSlice.actions;
export default userSlice.reducer;
