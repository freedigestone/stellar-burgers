import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import type { RootState } from '../../services/store';
import { clearOrder } from '../../services/orderSlice';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUser } from '../../services/userSlice';

import { Preloader } from '@ui';

import styles from './app.module.css';
import '../../index.css';

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUserLoaded = useAppSelector(
    (state: RootState) => state.user.isUserLoaded
  );

  // Загружаем ингредиенты
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // Загружаем данные пользователя при старте приложения
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleClose = () => {
    if (state?.backgroundLocation) {
      navigate(state.backgroundLocation.pathname);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* onlyUnAuth Pages */}
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
        />

        {/* Protected Pages */}
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />

        {/* Fullscreen pages for deep links */}
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute element={<OrderInfo />} />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* MODALS */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => {
                  dispatch(clearOrder()); // ← очищаем Redux.order
                  handleClose(); // ← стандартное закрытие модалки
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                element={
                  <Modal
                    title='Информация о заказе'
                    onClose={() => {
                      dispatch(clearOrder()); // ← очищаем Redux.order
                      handleClose(); // ← стандартное закрытие модалки
                    }}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
