import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userName: false,
    userEmail: false,
    userUid: false,
    accessToken: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user.userName = action.payload.userName;
      state.user.userEmail = action.payload.userEmail;
      state.user.userUid = action.payload.userUid;
    },
    setLogout(state, action) {
      state.user = false;
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;
export const selectUserName = (state) => state.user.user.userName;
export const selectUserEmail = (state) => state.user.user.userEmail;
export const selectUserId = (state) => state.user.user.userUid;

export default userSlice;
