import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cContainerService from "./cContainerService";

export const getcContainers = createAsyncThunk(
  "cContainer/get-ccontainers",
  async (thunkAPI) => {
    try {
      return await cContainerService.getcContainers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  cContainers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const cContainerSlice = createSlice({
  name: "cContainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcContainers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcContainers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cContainers = action.payload;
      })
      .addCase(getcContainers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default cContainerSlice.reducer;
