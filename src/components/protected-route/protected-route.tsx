import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../services/store';

type TProtectedRouteProps = {
  element: JSX.Element;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.data);
  const isUserLoaded = useSelector(
    (state: RootState) => state.user.isUserLoaded
  );

  // Пока грузим информацию о пользователе (после refresh токена)
  if (!isUserLoaded) {
    return null; // можно поставить прелоадер — скажешь, если хочешь
  }

  // Если маршрут доступен только НЕавторизованным
  if (onlyUnAuth && user) {
    return <Navigate to='/' replace />;
  }

  // Если маршрут требует авторизации
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return element;
};
