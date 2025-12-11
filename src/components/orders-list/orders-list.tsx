import { FC, memo } from 'react';
import { useAppSelector } from '../../services/hooks';
import { selectIngredients } from '../../services/ingredientsSlice';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  // ✔ правильно достаём ингредиенты
  const ingredients = useAppSelector(selectIngredients);

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
