import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { wsConnect, wsDisconnect } from '../../services/feedSlice';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Feed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.feed.orders);

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
