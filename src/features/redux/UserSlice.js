import { createSlice } from "@reduxjs/toolkit";
const initState = {
  loader: true,
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
  },
});
export const {setLoginState} = userSlice.actions
export default userSlice.reducer;
