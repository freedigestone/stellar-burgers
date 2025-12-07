import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

interface ProfileFeedState {
  orders: TOrder[];
  isConnected: boolean;
}

const initialState: ProfileFeedState = {
  orders: [],
  isConnected: false
};

const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {
    wsConnectProfile(state) {
      state.isConnected = true;
    },
    wsDisconnectProfile(state) {
      state.isConnected = false;
      state.orders = [];
    },
    wsMessageProfile(state, action: PayloadAction<any>) {
      state.orders = action.payload.orders;
    }
  }
});

export const { wsConnectProfile, wsDisconnectProfile, wsMessageProfile } =
  profileFeedSlice.actions;

export default profileFeedSlice.reducer;
