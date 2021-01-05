import { createSlice } from "@reduxjs/toolkit";
import { calculateNewPrice } from "./burgerUtils";

export const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    ingredients: [],
    totalPrice: 0,
  },
  reducers: {
    addOne: (state, action) => {
      state.ingredients = [...state.ingredients, `${action.payload.name}`];

      state.totalPrice = calculateNewPrice(
        state.totalPrice,
        action.payload.name,
        "add"
      );
    },
    removeOne: (state, action) => {
      for (var i = state.ingredients.length; i >= 0; i--) {
        if (state.ingredients[i] === action.payload.name) {
          state.ingredients.splice(i, 1);
          break;
        }
      }

      state.totalPrice = calculateNewPrice(
        state.totalPrice,
        action.payload.name,
        "remove"
      );
    },
  },
});

export const { addOne, removeOne } = burgerSlice.actions;

export const selectIngredients = (state) => state.burger.ingredients;
export const selectPrice = (state) => state.burger.totalPrice;

export default burgerSlice.reducer;
