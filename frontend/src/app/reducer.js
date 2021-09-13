import { combineReducers } from 'redux';
import { createAction, handleActions } from "redux-actions";
import keplerGlReducer from 'kepler.gl/reducers';

import {
  LOAD_MAPS_FILE,
  SET_LOADING_STATUS,
  SET_MAP_ID,
  SET_MAPBOX_REF,
  SET_STATISTICS,
  SET_ZOOM_LIMITS
} from "./actions";

// CONSTANTS
export const INIT = 'INIT';

// ACTIONS
export const appInit = createAction(INIT);

// INITIAL_STATE
const initialState = {
    appName: 'SCDi geoviz',
    mapboxRef: null,
    loaded: false,
    maps: [],
    mapId: null, // Used when map id is told in the url query param
    isMapLoading: false, // determine whether we are loading a sample map,
    error: null, // contains error when loading/retrieving data/configuration
    currentDetails: null,
    currentStatistics: [],
    minZoom: 0,
    maxZoom: 24
  };

// REDUCER
const appReducer = handleActions(
    {
      [INIT]: (state, action) => ({
        ...state,
        loaded: true
      }),
      [SET_LOADING_STATUS]: (state, action) => ({
        ...state,
        isMapLoading: action.isMapLoading
      }),
      [LOAD_MAPS_FILE]: (state, action) => ({
        ...state,
        maps: action.maps
      }),
      [SET_ZOOM_LIMITS]: (state, action) => ({
        ...state,
        minZoom: action.minZoom,
        maxZoom: action.maxZoom
      }),
      [SET_STATISTICS]: (state, action) => ({
        ...state,
        currentStatistics: action.payload
      }),
      [SET_MAP_ID]: (state, action) => ({
        ...state,
        mapId: action.payload
      }),
      [SET_MAPBOX_REF]: (state, action) => ({
        ...state,
        mapboxRef: action.payload
      })
    },
    initialState
  );

const scdiReducer = combineReducers({
    keplerGl: keplerGlReducer
      .initialState({
        uiState: {
          // hide side panel to disallower user customize the map
          readOnly: false,
  
          // use Finnish locale as default
          // locale: LOCALES.fi,
  
          // customize which map control button to show
          mapControls: {
            visibleLayers: {
              show: true
            },
            mapLegend: {
              show: true,
              active: false
            },
            toggle3d: {
              show: true
            },
            splitMap: {
              show: false
            },
            mapDraw: {
              show: false
            },
            mapLocale: {
              show: true
            }
          }
        }
      }),
      // handle additional actions
        //   .plugin({
        //     [HIDE_AND_SHOW_SIDE_PANEL]: (state, action) => ({
        //       ...state,
        //       uiState: {
        //         ...state.uiState,
        //         readOnly: action.readOnly !== undefined ? action.readOnly : !state.uiState.readOnly
        //       }
        //     }),
        //     [SET_ACTIVE_SIDE_PANEL]: (state, action) => ({
        //       ...state,
        //       uiState: {
        //         ...state.uiState,
        //         activeSidePanel: action.panelId
        //       }
        //     })
        //   }),
    app: appReducer
  });
  
export default scdiReducer;