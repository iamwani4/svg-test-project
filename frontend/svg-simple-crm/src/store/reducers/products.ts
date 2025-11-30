import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";

const API_URL = "/products";

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const createProduct = createAsyncThunk(
  "product/create",
  async (data: any) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, ...data }: any) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const i = state.items.findIndex((p) => p.id === action.payload.id);
        if (i > -1) state.items[i] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
