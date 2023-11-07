import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    logoutUser: (state) => {
      state.email = null;
    }
  }
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
