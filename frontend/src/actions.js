
// CONSTANTS
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

function setLoadingMapStatus(isMapLoading) {
  return {
    type: SET_LOADING_STATUS,
    isMapLoading
  }
};

export function loadMapConfigurations(mapId = null) {
  return dispatch => {
    dispatch(setLoadingMapStatus(true))
    //   requestJson(MAP_CONFIG_URL, (error, maps) => {
    //     if (error) {
    //       // TODO: error handling?
    //       console.log('ERROR in loadMapConfigurations: ', error);
    //     } else {
    //       requestJson(CHECK_AUTH_URL, (error, response) => {
    //         if (error) {
    //           // TODO: error handling?
    //           console.log('ERROR in loadMapConfigurations: ', error);
    //         } else {
    //           const isAuthenticated = response.is_authenticated;
    //           dispatch(setLoadingMapStatus(false));
    //           dispatch(loadMapsFile(maps.filter(map => isAuthenticated || map.enabled)));
  
    //           // Load specifig map
    //           const map = mapId && maps.find(s => s.id === mapId);
    //           if (map) {
    //             dispatch(loadMap(map));
    //           }
    //         }
    //       });
    //     }
    //   });
  }
};

export function loadMap(map) {
  return null
};