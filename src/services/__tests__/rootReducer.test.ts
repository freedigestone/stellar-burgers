import { store } from '../store';

describe('rootReducer', () => {
  test('должен вернуть корректное начальное состояние при неизвестном экшене', () => {
    const state = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orderHistory');
  });
});
