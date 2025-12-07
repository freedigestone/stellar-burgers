import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { createOrder, clearOrder } from '../../services/orderSlice';
import { BurgerConstructorUI } from '@ui';
import { TIngredient } from '../../utils/types';
import { clearConstructor } from '../../services/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // --- Данные конструктора ---
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state: RootState) => state.burgerConstructor.ingredients
  );

  // --- Данные по заказу ---
  const order = useSelector((state: RootState) => state.order.order);
  const orderRequest = useSelector((state: RootState) => state.order.isLoading);

  // --- Пользователь ---
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => !!state.user.data);

  /** Оформление заказа */
  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    // если не авторизован → отправляем на логин
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

  /** Закрыть модалку */
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
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

  const constructorItems = { bun, ingredients };

  /** Данные модалки (номер заказа) */
  const orderModalData = order ? { number: order.number } : null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
