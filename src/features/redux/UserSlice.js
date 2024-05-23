import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initState = {
  loader: true,
  boards: [],
  areBoardsFetched: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
      state.loader = false;
    },
    setBoard(state,action){
      state.boards = action.payload
      state.areBoardsFetched = true;
    },
    addBoard(state, action) {
      state.boards = [action.payload, ...state.boards];
    },
  },
  
});

export const { setLoginState, setBoard, addBoard} = userSlice.actions;
export default userSlice.reducer;
