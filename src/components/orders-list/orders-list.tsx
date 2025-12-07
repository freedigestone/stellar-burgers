import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import type { RootState } from '../../services/store';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  // ✔ правильно достаём ингредиенты
  const ingredients = useSelector((state: RootState) => state.ingredients.data);

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
