import { configureStore } from '@reduxjs/toolkit';
import orderHistoryReducer from './orderHistorySlice';
import ingredientsReducer from './ingredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice';
import feedReducer from './feedSlice';

import { wsMiddleware } from './wsMiddleware';

const ws = wsMiddleware();

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer,
    orderHistory: orderHistoryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ws),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
