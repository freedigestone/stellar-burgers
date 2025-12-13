import reducer, {
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown,
  type ConstructorState
} from '../burgerConstructorSlice';
import { TIngredient } from '../../utils/types';

describe('burgerConstructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'img',
    image_mobile: 'img',
    image_large: 'img'
  };

  const ingredient1: TIngredient = {
    _id: 'ing-1',
    name: 'Соус',
    type: 'sauce',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'img',
    image_mobile: 'img',
    image_large: 'img'
  };

  const ingredient2: TIngredient = {
    ...ingredient1,
    _id: 'ing-2',
    name: 'Начинка'
  };

  const initialState: ConstructorState = {
    bun: null,
    ingredients: []
  };

  it('устанавливает булку', () => {
    const state = reducer(initialState, setBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('добавляет ингредиент', () => {
    const state = reducer(initialState, addIngredient(ingredient1));
    expect(state.ingredients).toHaveLength(1);
  });

  it('удаляет ингредиент', () => {
    const state = reducer(
      { ...initialState, ingredients: [ingredient1] },
      removeIngredient(0)
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('двигает ингредиент вверх', () => {
    const state = reducer(
      { ...initialState, ingredients: [ingredient1, ingredient2] },
      moveIngredientUp(1)
    );

    expect(state.ingredients[0]._id).toBe('ing-2');
  });

  it('двигает ингредиент вниз', () => {
    const state = reducer(
      { ...initialState, ingredients: [ingredient1, ingredient2] },
      moveIngredientDown(0)
    );

    expect(state.ingredients[1]._id).toBe('ing-1');
  });

  it('очищает конструктор', () => {
    const state = reducer(
      { bun, ingredients: [ingredient1] },
      clearConstructor()
    );

    expect(state).toEqual(initialState);
  });
});
