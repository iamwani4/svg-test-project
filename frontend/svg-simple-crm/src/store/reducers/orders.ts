import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  id: number;
  clientId?: number;
  totalAmount: number;
  cashAmount: number;
  cardAmount: number;
  Client?: { name: string };
}

interface OrdersState {
  items: Order[];
  loading: boolean;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.items = action.payload;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.items.unshift(action.payload);
    },
    updateOrder(state, action: PayloadAction<Order>) {
      const idx = state.items.findIndex((o) => o.id === action.payload.id);
      if (idx > -1) state.items[idx] = action.payload;
    },
    removeOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter((o) => o.id !== action.payload);
    },
  },
});

export const { setLoading, setOrders, addOrder, updateOrder, removeOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
