import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../services/store';
import { updateUser } from '../../services/userSlice';
import { logoutUser } from '../../services/userSlice';
import { useNavigate } from 'react-router-dom';
export const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.data);
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login', { replace: true });
  };
  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  // когда пользователь загрузился / изменился — обновляем форму
  useEffect(() => {
    if (user) {
      setFormValue((prev) => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const isFormChanged = useMemo(() => {
    if (!user) return false;

    return (
      formValue.name !== user.name ||
      formValue.email !== user.email ||
      formValue.password.length > 0
    );
  }, [formValue, user]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;

    const payload: { name: string; email: string; password?: string } = {
      name: formValue.name,
      email: formValue.email
    };

    if (formValue.password) {
      payload.password = formValue.password;
    }

    dispatch(updateUser(payload));

    setFormValue((prev) => ({
      ...prev,
      password: ''
    }));
  };

  const handleCancel = () => {
    if (!user) return;

    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
