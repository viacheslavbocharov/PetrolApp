import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронное действие для получения филиалов
export const fetchBranches = createAsyncThunk(
  'branch/fetchBranches',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/getBranchesByUserId', { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFuelSell = createAsyncThunk(
  'branch/fetchFuelSell',
  async (purchase, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchFuelSell', purchase);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFuelTransfer = createAsyncThunk(
  'branch/fetchFuelTransfer',
  async (purchase, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchFuelTransfer', purchase);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFuelBuy = createAsyncThunk(
  'branch/fetchFuelBuy',
  async (purchase, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchFuelBuy', purchase);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUpdatedBranch = createAsyncThunk(
  'branch/fetchUpdatedBranch',
  async ({ updatedBranch, editor }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchUpdatedBranch', {
        updatedBranch,
        editor
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddBranch = createAsyncThunk(
  'branch/fetchAddBranch',
  async ({ newBranch, editor }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchAddBranch', {
        newBranch,
        editor
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    userBranches: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userBranches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFuelSell.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userBranches = action.payload;
      })
      .addCase(fetchFuelTransfer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userBranches = action.payload;
      })
      .addCase(fetchFuelBuy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userBranches = action.payload;
      })
      .addCase(fetchUpdatedBranch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userBranches = action.payload;
      })
      .addCase(fetchAddBranch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userBranches = action.payload;
      });
  },
});

export default branchSlice.reducer;
