import { configureStore } from '@reduxjs/toolkit';
import {enhanceReduxMiddleware} from 'kepler.gl/middleware';
import scdiReducer from './reducer';

export const store = configureStore({
  devTools: false,
  reducer: scdiReducer,
  middleware: (getDefaultMiddleware) => 
    enhanceReduxMiddleware(getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }))
});
