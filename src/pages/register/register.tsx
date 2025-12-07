import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../services/userSlice';
import type { AppDispatch, RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const error = useSelector((state: RootState) => state.user.error);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        registerUser({ email, password, name: userName })
      );

      if (registerUser.fulfilled.match(resultAction)) {
        // после успешной регистрации отправляем на /login
        navigate('/login', { replace: true });
      }
    } catch {
      // ошибка уже в user.error
      return;
    }
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
