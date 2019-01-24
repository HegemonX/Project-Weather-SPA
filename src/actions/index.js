import * as ipapiGet from "../api/ipapiGET";
import * as weatherGet from "../api/weatherGET";
import {
  getWoeid,
  getCityInfo,
  getLatLong,
  getIsCitiesFetching
} from "../reducers";

export const fetchNearestCityInfo = () => async (dispatch, getState) => {
  await dispatch(fetchNearestCities());
  const nearestWoeid = getWoeid(getState());
  await dispatch(fetchCityInfo(nearestWoeid));
};

export const fetchCityInfo = woeid => async dispatch => {
  try {
    dispatch({
      type: "FETCH_CITY_INFO_REQUEST"
    });
    const response = await weatherGet.getInfoByLocation(woeid);
    const { consolidated_weather, sources, ...rest } = response;
    dispatch({
      type: "FETCH_CITY_INFO_SUCCESS",
      weekWeather: consolidated_weather,
      woeid,
      general: rest
    });
  } catch (error) {
    dispatch({
      type: "FETCH_CITY_INFO_ERROR",
      error
    });
  }
};

export const fetchNearestCities = () => async (dispatch, getState) => {
  await dispatch(fetchLatlong());
  const latlong = getLatLong(getState());
  await dispatch(fetchCitiesByCoords(latlong));
};

export const fetchLatlong = () => async dispatch => {
  try {
    dispatch({
      type: "FETCH_LATLONG_REQUEST"
    });
    const response = await ipapiGet.getLatlong();
    const latlong = `${response.latitude},${response.longitude}`;
    dispatch({
      type: "FETCH_LATLONG_SUCCESS",
      latlong
    });
  } catch (error) {
    dispatch({
      type: "FETCH_LATLONG_ERROR",
      error
    });
  }
};

const fetchCitiesByCoords = latlong => async (dispatch, getState) => {
  try {
    dispatch({
      type: "FETCH_NEAREST_CITIES_REQUEST"
    });
    const response = await weatherGet.getSitiesListByCoords(latlong);
    dispatch({
      type: "FETCH_NEAREST_CITIES_SUCCESS",
      response
    });
  } catch (error) {
    dispatch({
      type: "FETCH_LATLONG_ERROR",
      error
    });
  }
};

export const fetchCitiesBySearch = query => async (dispatch, getState) => {
  if (!query) return;
  if (getIsCitiesFetching(getState())) {
    console.log("fetching");
    return;
  }
  try {
    dispatch({
      type: "CITY_SEARCH_REQUEST"
    });
    const response = await weatherGet.getSitiesList(query);
    dispatch({
      type: "CITY_SEARCH_SUCCESS",
      response
    });
  } catch (error) {
    dispatch({
      type: "CITY_SEARCH_ERROR",
      error
    });
  }
};
export const fetchWeatherByDate = (woeid, dateKey) => async (
  dispatch,
  getState
) => {
  try {
    if (!getCityInfo(getState(), woeid)) await dispatch(fetchCityInfo(woeid));
    dispatch({
      type: "FETCH_WEATHER_BY_DATE_REQUEST",
      woeid,
      dateKey
    });
    const response = await weatherGet.getWeatherByDate(woeid, dateKey);
    dispatch({
      type: "FETCH_WEATHER_BY_DATE_SUCCESS",
      response,
      dateKey,
      woeid
    });
  } catch (error) {
    dispatch({
      type: "FETCH_WEATHER_BY_DATE_ERROR",
      error,
      woeid,
      dateKey
    });
  }
};

export const setSearchQuery = query => ({
  type: "SET_SEARCH_QUERY",
  searchQuery: query
});
