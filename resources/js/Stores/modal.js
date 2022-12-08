import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpenNavModal: false,
  },
  reducers: {
    setIsOpenNavModal: (state, action) => {
      state.isOpenNavModal = action.payload;
    },
  },
});

export const {
  setIsOpenNavModal,
} = modalSlice.actions;

export default modalSlice.reducer;
