import {json as requestJson, text as requestText} from 'd3-request';
import { processCsvData, processGeojson, processKeplerglJSON } from "kepler.gl/processors";
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

function loadRemoteResourceSuccess(data, files = null) {
  let payload;
  // Using json including kepler config and data
  if (data.datasets === null) {
    console.log('Using kepler json');
    payload = processKeplerglJSON(data.config);
    // payload.config.mapStyle.styleType =
    //   STYLES_MAP[payload.config.mapStyle.styleType] !== undefined
    //     ? STYLES_MAP[payload.config.mapStyle.styleType]
    //     : STYLES_MAP.default;
  // Using separate data files
  } else {
    console.log('Parsing remote dataset')
    let processorMethod = processCsvData;
    const datasets = data.datasets.map(dataset => {
      let incoming_data;
      if (dataset.type === 'json' || dataset.type === 'geojson') {
        console.log('Using geojson')
        processorMethod = processGeojson;
        incoming_data = JSON.parse(files[dataset.id]);
      } else {
        console.log('Using csv');
        processorMethod = processCsvData;
        incoming_data = files[dataset.id];
      }
      console.log(incoming_data)
      return {
        info: {
          id: dataset.id,
          label: dataset.label
        },
        data: processorMethod(incoming_data)
      };
    });

    let config = data.config
    let options = {centerMap: true}
    // config.config.mapStyle.styleType =
    //   STYLES_MAP[config.config.mapStyle.styleType] !== undefined
    //     ? STYLES_MAP[config.config.mapStyle.styleType]
    //     : STYLES_MAP.default;

    payload = {
      datasets,
      options,
      config,
      details: data.details
    }
    console.log('we have payload')
    console.log(payload)
  }
  return {
    type: LOAD_REMOTE_RESOURCE_SUCCESS,
    payload
  }
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
        console.log('we have data')
        console.log(data)
        dispatch(loadRemoteData(data))
      }
    })
  }
}

export function loadRemoteData(data) {
  return dispatch => {
    if (data.datasets.length > 0) {

      let files = {}
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
                // cannot mutate state directly
                //dataset['file'] = file;
                files[dataset.id] = file
                resolve(dataset);
              }
            });
          });
        })
      ).then(datasets => {
        console.log('we dispatch success with data')
        console.log(data)
        dispatch(setLoadingMapStatus(false));
        dispatch(loadRemoteResourceSuccess(data, files));
      });

    } else {
      dispatch(setLoadingMapStatus(false));
      dispatch(loadRemoteResourceSuccess(data));
    }
  };
}
