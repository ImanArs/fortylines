import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Типы для dispatch и state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
