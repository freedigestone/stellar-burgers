import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/userSlice';
import type { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
