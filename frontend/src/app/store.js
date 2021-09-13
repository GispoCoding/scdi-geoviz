import { configureStore } from '@reduxjs/toolkit';
import {enhanceReduxMiddleware} from 'kepler.gl/middleware';
import scdiReducer from './reducer';

export const store = configureStore({
  reducer: scdiReducer,
  middleware: (getDefaultMiddleware) => 
    enhanceReduxMiddleware(getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          '@@kepler.gl/MOUSE_MOVE',
          '@@kepler.gl/TOGGLE_MODAL',
          '@@kepler.gl/UPDATE_MAP',
          '@@kepler.gl/LOAD_MAP_STYLES',
          '@@kepler.gl/LAYER_HOVER'
        ],
      },
    }))
});
