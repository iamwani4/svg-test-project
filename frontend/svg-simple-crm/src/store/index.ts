import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/products";
import clientReducer from "./reducers/clients";
import orderReducer from "./reducers/orders";
import commentReducer from "./reducers/comments";
import userReducer from "./reducers/users";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    client: clientReducer,
    order: orderReducer,
    comment: commentReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
