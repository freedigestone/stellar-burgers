import { configureStore } from '@reduxjs/toolkit';

import ingredientsReducer from '../ingredientsSlice';
import burgerConstructorReducer from '../burgerConstructorSlice';
import orderReducer from '../orderSlice';
import userReducer from '../userSlice';
import feedReducer from '../feedSlice';
import orderHistoryReducer from '../orderHistorySlice';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние при undefined state и UNKNOWN_ACTION', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        user: userReducer,
        feed: feedReducer,
        orderHistory: orderHistoryReducer
      }
    });

    store.dispatch({ type: 'UNKNOWN_ACTION' });

    const state = store.getState();

    expect(state).toMatchObject({
      ingredients: {
        data: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        order: null,
        isLoading: false,
        error: null
      },
      user: {
        data: null,
        isLoading: false,
        error: null
      }
    });
  });
});
