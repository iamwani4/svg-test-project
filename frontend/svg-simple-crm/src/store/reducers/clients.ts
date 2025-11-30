import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";

const API_URL = "/clients";

export const fetchClients = createAsyncThunk("client/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const searchClients = createAsyncThunk(
  "client/search",
  async (q: string) => {
    const res = await axios.get(`${API_URL}/search?q=${q}`);
    return res.data;
  }
);

export const createClient = createAsyncThunk(
  "client/create",
  async (data: any) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  }
);

export const updateClient = createAsyncThunk(
  "client/update",
  async ({ id, ...data }: any) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

export const deleteClient = createAsyncThunk(
  "client/delete",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const i = state.items.findIndex((c) => c.id === action.payload.id);
        if (i > -1) state.items[i] = action.payload;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export default clientSlice.reducer;
