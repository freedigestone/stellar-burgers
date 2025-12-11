import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  wsProfileConnect,
  wsProfileDisconnect
} from '../../services/orderHistorySlice';
import type { AppDispatch, RootState } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((state: RootState) => state.orderHistory);

  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];
    console.log('TOKEN =', token);
    if (token) {
      dispatch(wsProfileConnect(token));
    }

    return () => {
      dispatch(wsProfileDisconnect());
    };
  }, [dispatch]);
  console.log('ORDERS STATE =', orders);
  return <ProfileOrdersUI orders={orders} />;
};
