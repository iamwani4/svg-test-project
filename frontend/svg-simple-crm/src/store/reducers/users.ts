import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/users";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, ...data }: any) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const i = state.items.findIndex((u: any) => u.id === action.payload.id);
        if (i > -1) state.items[i] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u: any) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
