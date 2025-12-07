import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '../utils/burger-api';
import { TUser } from '../utils/types';
import { setCookie } from '../utils/cookie';

interface UserState {
  data: TUser | null;
  isUserLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  isUserLoaded: false,
  isLoading: false,
  error: null
};

// ---------- LOGIN ----------
export const loginUser = createAsyncThunk(
  'user/login',
  async (form: { email: string; password: string }) => {
    const res = await loginUserApi(form);
    // loginUserApi возвращает TAuthResponse:
    // { success, user, accessToken, refreshToken, message? }
    return {
      user: res.user,
      tokens: {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      }
    };
  }
);

// ---------- REGISTER ----------
export const registerUser = createAsyncThunk(
  'user/register',
  async (form: { email: string; password: string; name: string }, thunkAPI) => {
    const res = await registerUserApi(form);

    if (!res.success) {
      return thunkAPI.rejectWithValue(res.message);
    }

    return {
      user: res.user,
      tokens: {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      }
    };
  }
);

// ---------- LOGOUT ----------
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  // очищаем токены
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '', { expires: -1 });
  return null;
});

// ---------- GET USER ----------
export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

// ---------- UPDATE USER ----------
export const updateUser = createAsyncThunk(
  'user/update',
  async (form: { email: string; name: string; password?: string }) => {
    const res = await updateUserApi(form);
    return res.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.data = null;
      state.isUserLoaded = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;

        const { accessToken, refreshToken } = action.payload.tokens;
        setCookie('accessToken', accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Ошибка входа. Попробуйте ещё раз';
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;

        const { accessToken, refreshToken } = action.payload.tokens;
        setCookie('accessToken', accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          'Ошибка регистрации. Попробуйте ещё раз';
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isUserLoaded = true;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.isUserLoaded = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isUserLoaded = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.data = null;
        state.isUserLoaded = true;
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
