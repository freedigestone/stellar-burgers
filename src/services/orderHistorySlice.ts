import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { TOrdersData } from '../utils/types';

export type TOrder = {
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
};

interface OrderHistoryState {
  wsConnected: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: OrderHistoryState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    wsConnectionStart: () => {},

    wsConnectionSuccess(state) {
      state.wsConnected = true;
      state.error = null;
    },

    wsConnectionError(state, action: PayloadAction<string>) {
      state.wsConnected = false;
      state.error = action.payload;
    },

    wsConnectionClosed(state) {
      state.wsConnected = false;
    },

    wsGetMessage(
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(wsProfileMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});
export const wsProfileConnect = createAction<string>('wsProfileConnect');
export const wsProfileDisconnect = createAction('wsProfileDisconnect');
export const wsProfileMessage = createAction<TOrdersData>('wsProfileMessage');

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} = orderHistorySlice.actions;

export default orderHistorySlice.reducer;
