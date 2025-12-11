import { FC, SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/userSlice';
import type { RootState } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const error = useAppSelector((state: RootState) => state.user.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        const from =
          (location.state as { from?: Location })?.from?.pathname || '/';

        navigate(from, { replace: true });
      }
    } catch {
      // ошибка уже в user.error
      return;
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
