import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients.push(action.payload);
    },
    // 🆕 ДОБАВИЛИ УДАЛЕНИЕ
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index <= 0) return; // нельзя поднять первый элемент

      const items = state.ingredients;
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    },

    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= state.ingredients.length - 1) return; // нельзя опустить последний

      const items = state.ingredients;
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
export type { ConstructorState };
