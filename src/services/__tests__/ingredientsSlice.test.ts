import reducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice — async actions', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Краторная булка',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large'
    }
  ];

  const initialState = {
    data: [],
    isLoading: false,
    error: null
  };

  it('fetchIngredients.pending → isLoading = true', () => {
    const action = fetchIngredients.pending('requestId');
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.fulfilled → данные записаны, isLoading = false', () => {
    const action = fetchIngredients.fulfilled(mockIngredients, 'requestId');
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.rejected → error записан, isLoading = false', () => {
    const action = fetchIngredients.rejected(
      new Error('Ошибка загрузки'),
      'requestId'
    );
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
