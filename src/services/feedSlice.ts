import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect(state) {
      state.isConnected = true;
    },
    wsDisconnect(state) {
      state.isConnected = false;
    },
    wsMessage(state, action: PayloadAction<any>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { wsConnect, wsDisconnect, wsMessage } = feedSlice.actions;
export default feedSlice.reducer;
