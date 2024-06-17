import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dashboardReducer from './dashboardSlice';
import branchReducer from './branchSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    branch: branchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Включить Redux DevTools только в режиме разработки
});

export default store;