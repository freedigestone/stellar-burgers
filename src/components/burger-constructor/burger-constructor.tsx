import { FC, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { RootState } from '../../services/store';
import { createOrder, clearOrder } from '../../services/orderSlice';
import { BurgerConstructorUI } from '@ui';
import { TIngredient } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  // Данные конструктора
  const bun = useAppSelector((state: RootState) => state.burgerConstructor.bun);
  const ingredients = useAppSelector(
    (state: RootState) => state.burgerConstructor.ingredients
  );

  // Данные по заказу
  const order = useAppSelector((state: RootState) => state.order.order);
  const orderRequest = useAppSelector(
    (state: RootState) => state.order.isLoading
  );

  // Пользователь
  const navigate = useNavigate();
  const isAuth = useAppSelector((state: RootState) => !!state.user.data);

  /** Оформление заказа */
  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuth) {
      return navigate('/login', { state: { from: '/' } });
    }

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  /** Цена */
  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (sum: number, item: TIngredient) => sum + item.price,
        0
      ),
    [bun, ingredients]
  );

  /** Добавляем id для корректных ключей */
  const constructorItems = {
    bun,
    ingredients: ingredients.map((item) => ({
      ...item,
      id: crypto.randomUUID()
    }))
  };

  /** Данные модалки */
  const orderModalData = order ? { number: order.number } : null;

  /** Закрыть модалку */
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      onCloseModal={closeOrderModal}
    />
  );
};
