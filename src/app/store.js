import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoryReducer from '../features/category/CategorySlice';
import genderReducer from '../features/category/GenderSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category:categoryReducer,
    genders:genderReducer
  },
});
