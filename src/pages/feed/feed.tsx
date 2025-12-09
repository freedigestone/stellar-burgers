import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { RootState, AppDispatch } from '../../services/store';
import { wsConnect, wsDisconnect } from '../../services/feedSlice';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Feed = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: RootState) => state.feed.orders);

  useEffect(() => {
    dispatch(wsConnect());
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  if (!orders.length) return <Preloader />;

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(wsDisconnect());
        setTimeout(() => dispatch(wsConnect()), 200); // reconnect
      }}
    />
  );
};
