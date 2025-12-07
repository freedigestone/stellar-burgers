import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types'; // ← важный импорт

// Тип состояния
interface IngredientsState {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

// Thunk
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

// Slice
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // теперь типы совпадают
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки';
      });
  }
});

export default ingredientsSlice.reducer;
