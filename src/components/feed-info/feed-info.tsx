import { useAppSelector } from '../../services/hooks';
import { RootState } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = () => {
  const orders = useAppSelector((state: RootState) => state.feed.orders);
  const total = useAppSelector((state: RootState) => state.feed.total);
  const totalToday = useAppSelector(
    (state: RootState) => state.feed.totalToday
  );

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = { total, totalToday };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
