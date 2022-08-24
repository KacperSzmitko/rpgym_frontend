import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoType {
  email: string;
  wieght: number;
  max_cycle: number;
  current_cycle: number;
}

const initialState = {
  email: "",
  wieght: 0,
  max_cycle: 0,
  current_cycle: 0,
} as UserInfoType;

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userInfoFetched(state: UserInfoType, action: PayloadAction<UserInfoType>) {
      return action.payload;
    },
  },
});

export const { userInfoFetched } = userInfoSlice.actions;
export default userInfoSlice.reducer;
