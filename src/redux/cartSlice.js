import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    AddItem: (state, action) => {
      let existItem = state.find((item) => item.id == action.payload.id);
      if (existItem) {
        return state.map((item) =>
          item.id == action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.push(action.payload);
      }
    },
    RemoveItem: (state, action) => {
      let existItem = state.find((item) => item.id == action.payload);
      if (existItem) {

        return state.filter((item) =>
          item.id != action.payload   );
      }
    },
    QtyIncrement: (state, action) => {
      let existItem = state.find((item) => item.id == action.payload);
      if (existItem) {
        return state.map((item) =>
          item.id == action.payload ? { ...item, qty: item.qty + 1 } : item
        );
      }
    },
    QtyDecrement: (state, action) => {
      return state.map((item) =>
        item.id == action.payload && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    },
    RemoveAll: () => {
      return []; // This clears the entire cart
    },
  },
});

export const { AddItem, RemoveItem, RemoveAll, QtyDecrement, QtyIncrement } =
  cartSlice.actions;
export default cartSlice.reducer;
