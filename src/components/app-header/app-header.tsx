import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/hooks';
import { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useAppSelector((state: RootState) => state.user.data);

  return <AppHeaderUI userName={user?.name || ''} />;
};
