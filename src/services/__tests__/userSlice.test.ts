import reducer, { getUser } from '../userSlice';
import { TUser } from '../../utils/types';

type UserState = ReturnType<typeof reducer>;

describe('userSlice async flow', () => {
  const user: TUser = {
    email: 'test@test.ru',
    name: 'Илья'
  };

  const initialState: UserState = {
    data: null,
    isUserLoaded: false,
    isLoading: false,
    error: null
  };

  test.each([
    {
      description: 'pending → пользователь не загружен',
      action: getUser.pending('req'),
      expected: { isUserLoaded: false }
    },
    {
      description: 'fulfilled → пользователь записан',
      action: getUser.fulfilled(user, 'req'),
      expected: { data: user, isUserLoaded: true }
    },
    {
      description: 'rejected → пользователь очищен',
      action: getUser.rejected(new Error('err'), 'req'),
      expected: { data: null, isUserLoaded: true }
    }
  ])('$description', ({ action, expected }) => {
    const state = reducer(initialState, action);
    expect(state).toMatchObject(expected);
  });
});
