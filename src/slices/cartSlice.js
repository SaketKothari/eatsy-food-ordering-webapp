import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action) => {
      let pos = state.items.findIndex((item) => item.id === action.payload.id);
      let newBasket = [...state.items];

      if (pos > -1) {
        newBasket.splice(pos, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in the cart`
        );
      }
      state.items = newBasket;
    },

    clearCart: (state) => {
      // or return {items: []};  ==> this new object will be replaced inside original state
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
