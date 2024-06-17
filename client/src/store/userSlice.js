import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthorize: false,
  userRole: null,
  user: null,
  token: null,
  errors: null,
};

// export const signin = createAsyncThunk('user/signin', async ({ login, password }) => {
//   const response = await axios.post('http://localhost:5000/api/signin', { login, password });
//   return response.data;
// });

export const signin = createAsyncThunk(
  'user/signin',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signin', { login, password });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Возвращаем сообщение об ошибке от сервера
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signout: (state) => {
      state.isAuthorize = false;
      state.userRole = null;
      state.user = null;
      state.token = null;
      state.errors = null;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.isAuthorize = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.errors = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.errors = action.payload;
      });
  }
});

export const { signout, setUserRole } = userSlice.actions;

export default userSlice.reducer;
