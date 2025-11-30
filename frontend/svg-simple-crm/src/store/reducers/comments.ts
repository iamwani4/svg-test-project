import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";

const API_URL = "/comments";

export const fetchComments = createAsyncThunk("comment/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const createComment = createAsyncThunk(
  "comment/create",
  async (data: { content: string }) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  }
);

export const updateComment = createAsyncThunk(
  "comment/update",
  async ({ id, content }: { id: number; content: string }) => {
    const res = await axios.put(`${API_URL}/${id}`, { content });
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const i = state.items.findIndex((c) => c.id === action.payload.id);
        if (i > -1) state.items[i] = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export default commentSlice.reducer;
