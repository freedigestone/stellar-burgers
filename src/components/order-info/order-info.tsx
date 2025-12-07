import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { RootState, AppDispatch } from '../../services/store';
import { fetchOrderByNumber } from '../../services/orderSlice';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const orderData = useSelector((state: RootState) => state.order.order);
  const ingredients = useSelector((state: RootState) => state.ingredients.data);

  // Хук ВСЕГДА вызывается
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, id) => {
        const ingredient = ingredients.find((ing) => ing._id === id);

        if (ingredient) {
          if (!acc[id]) acc[id] = { ...ingredient, count: 1 };
          else acc[id].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, i) => acc + i.price * i.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      total,
      date
    };
  }, [orderData, ingredients]);

  // Загружаем заказ
  useEffect(() => {
    if (number) dispatch(fetchOrderByNumber(Number(number)));
  }, [number, dispatch]);

  // Теперь можно безопасно рендерить
  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
