import reducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '../../utils/types';

type IngredientsState = ReturnType<typeof reducer>;

describe('ingredientsSlice async flow', () => {
  const ingredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 5,
      image: 'img',
      image_mobile: 'img',
      image_large: 'img'
    }
  ];

  const initialState: IngredientsState = {
    data: [],
    isLoading: false,
    error: null
  };

  test.each([
    {
      description: 'pending → isLoading = true',
      action: fetchIngredients.pending('req'),
      expected: { isLoading: true }
    },
    {
      description: 'fulfilled → данные записаны',
      action: fetchIngredients.fulfilled(ingredients, 'req'),
      expected: { isLoading: false, data: ingredients }
    },
    {
      description: 'rejected → ошибка записана',
      action: fetchIngredients.rejected(new Error('err'), 'req'),
      expected: { isLoading: false, error: 'Ошибка загрузки' }
    }
  ])('$description', ({ action, expected }) => {
    const state = reducer(initialState, action);
    expect(state).toMatchObject(expected);
  });
});
