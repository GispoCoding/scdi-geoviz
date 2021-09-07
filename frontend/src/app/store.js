import { configureStore } from '@reduxjs/toolkit';
import keplerGlReducer from 'kepler.gl/reducers';
import {enhanceReduxMiddleware} from 'kepler.gl/middleware';

export const store = configureStore({
  reducer: {
    keplerGl: keplerGlReducer,
  },
  middleware: (getDefaultMiddleware) => enhanceReduxMiddleware(getDefaultMiddleware())
});
