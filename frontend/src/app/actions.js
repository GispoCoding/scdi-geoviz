import {json as requestJson, text as requestText} from 'd3-request';
import {createAction} from 'redux-actions';
import {MAP_CONFIGS} from '../constants/settings';

// CONSTANTS
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const LOAD_REMOTE_RESOURCE_SUCCESS = 'LOAD_REMOTE_RESOURCE_SUCCESS';
export const LOAD_MAPS_FILE = 'LOAD_MAPS_FILE';
export const SET_ZOOM_LIMITS = 'SET_ZOOM_LIMITS';
export const SET_STATISTICS = 'SET_STATISTICS';
export const SET_MAP_ID = 'SET_MAP_ID';
export const SET_MAPBOX_REF = 'SET_MAPBOX_REF';

function setLoadingMapStatus(isMapLoading) {
  return {
    type: SET_LOADING_STATUS,
    isMapLoading
  }
};

function loadRemoteResourceSuccess(data, datasets = null) {
  return {
    type: LOAD_REMOTE_RESOURCE_SUCCESS,
    datasets,
    data
  };
}

export function loadMapsFile(maps) {
  return {
    type: LOAD_MAPS_FILE,
    maps
  };
}

export function setZoomLimits(minZoom, maxZoom) {
  return {
    type: SET_ZOOM_LIMITS,
    minZoom,
    maxZoom
  };
}

export const setStatistics = createAction(SET_STATISTICS);
export const setMapId = createAction(SET_MAP_ID);
export const setMapboxRef = createAction(SET_MAPBOX_REF);

export function loadMapConfigurations(mapId = null) {
  return dispatch => {
    dispatch(loadMapsFile(MAP_CONFIGS))
    const map = mapId && MAP_CONFIGS.find(s => s.id === mapId)
    if (map) {
      dispatch(loadMap(map))
    }
  }
};

export function loadMap(map) {
  return dispatch => {
    dispatch(setLoadingMapStatus(true));
    dispatch(setMapId(map.id));
    dispatch(setZoomLimits(map.minZoom, map.maxZoom));
    //dispatch(setActiveSidePanel(null));
    //dispatch(setReadOnlyState(map.readOnly));
    //dispatch(loadRemoteStatistics(map));

    const configUrl = process.env.PUBLIC_URL + '/config/' + map.id + '.json'
    requestJson(configUrl, (error, config) => {
      if (error) {
        // TODO: error handling?
        console.log('ERROR in loadMap: ', error);
      } else {
        const data = {
          config,
          details: map.details,
          datasets: map.datasets
        }
        dispatch(loadRemoteData(data))
      }
    })
  }
}

export function loadRemoteData(data) {
  return dispatch => {
    if (data.datasets.length > 0) {
      Promise.all(
        data.datasets.map(dataset => {
          return new Promise((resolve, reject) => {
            const datasetUrl = process.env.PUBLIC_URL + '/data/' + dataset.id + '.' + dataset.type
            requestText(datasetUrl, (error, file) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.log('ERROR in loadRemoteData: ', error);
                reject(error);
              } else {
                dataset['file'] = file;
                resolve(dataset);
              }
            });
          });
        })
      ).then(datasets => {
        dispatch(setLoadingMapStatus(false));
        dispatch(loadRemoteResourceSuccess(data, datasets));
      });
    } else {
      dispatch(setLoadingMapStatus(false));
      dispatch(loadRemoteResourceSuccess(data));
    }
  };
}