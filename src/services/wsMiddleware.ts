import { Middleware } from '@reduxjs/toolkit';
import { wsConnect, wsDisconnect, wsMessage } from './feedSlice';

import {
  wsProfileConnect,
  wsProfileDisconnect,
  wsProfileMessage
} from './orderHistorySlice';

export const wsMiddleware = (): Middleware => (store) => {
  let feedSocket: WebSocket | null = null;
  let profileSocket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;

    // ==============================
    // FEED SOCKET  (public)
    // ==============================
    if (wsConnect.match(action)) {
      if (feedSocket) feedSocket.close();
      feedSocket = new WebSocket(
        'wss://norma.education-services.ru/orders/all'
      );

      feedSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(wsMessage(data));
      };

      feedSocket.onerror = () => console.error('WS feed error');
    }

    if (wsDisconnect.match(action) && feedSocket) {
      feedSocket.close();
      feedSocket = null;
    }

    // ==============================
    // PROFILE SOCKET (requires token)
    // ==============================
    if (wsProfileConnect.match(action)) {
      if (profileSocket) profileSocket.close();
      const token = action.payload; // accessToken without Bearer
      profileSocket = new WebSocket(
        `wss://norma.education-services.ru/orders?token=${token}`
      );

      profileSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(wsProfileMessage(data));
      };

      profileSocket.onerror = () => console.error('WS profile error');
    }

    if (wsProfileDisconnect.match(action) && profileSocket) {
      profileSocket.close();
      profileSocket = null;
    }

    return next(action);
  };
};
