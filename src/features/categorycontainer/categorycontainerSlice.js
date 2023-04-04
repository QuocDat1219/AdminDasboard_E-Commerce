import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categorycontainerService from "./categorycontainerService";

export const getCategoryContainer = createAsyncThunk(
  "product/get-categorycontainer",
  async (thunkAPI) => {
    try {
      return await categorycontainerService.getcategorycontainer();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const deleteAProduct = createAsyncThunk(
//   "product/delete-product",
//   async (id, thunkAPI) => {
//     try {
//       return await productService.deleteProduct(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const createProducts = createAsyncThunk(
//   "product/create-products",
//   async (productData, thunkAPI) => {
//     try {
//       return await productService.createProduct(productData);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const resetState = createAction("Reset_all");

const initialState = {
  categorycontainer: [],
  deleteCategorycontainer: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const categorycontainerSlice = createSlice({
  name: "categoryContainer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryContainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categorycontainer = action.payload;
      })
      .addCase(getCategoryContainer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default categorycontainerSlice.reducer;
