import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export default store;
