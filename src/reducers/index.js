import { combineReducers } from "redux";
import cities, * as fromCities from "./cities";

const latlong = (state = null, action) => {
  switch (action.type) {
    case "FETCH_LATLONG_SUCCESS":
      return action.latlong;
    default:
      return state;
  }
};

const searchQuery = (state = "", action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return action.searchQuery;
    default:
      return state;
  }
};

const myApp = combineReducers({
  latlong,
  cities,
  searchQuery
});
export default myApp;

export const getWoeid = state => {
  return getNearestCity(state) === undefined
    ? undefined
    : getNearestCity(state).woeid;
};

export const getLatLong = state => state.latlong;

export const getCitiesFromSearch = state =>
  fromCities.getFromSearch(state.cities);

export const getNearestCity = state => fromCities.getNearest(state.cities);

export const getWeekWeather = (state, woeid) => {
  if (!woeid) {
    const nearestWoeid = getWoeid(state);
    return fromCities.getWeekWeatherByWoeid(state.cities, nearestWoeid);
  }
  return fromCities.getWeekWeatherByWoeid(state.cities, woeid);
};

export const getDailyWeather = (state, woeid, dateKey) => {
  if (!woeid) {
    const nearestWoeid = getWoeid(state);
    return fromCities.getDailyWeatherByWoeid(
      state.cities,
      nearestWoeid,
      dateKey
    );
  }
  return fromCities.getDailyWeatherByWoeid(state.cities, woeid, dateKey);
};

export const getCityInfo = (state, woeid) =>
  fromCities.getInfoByWoeid(state.cities, woeid);

export const getNearestSityInfo = state => {
  const woeid = getWoeid(state);
  return woeid ? fromCities.getInfoByWoeid(state.cities, woeid) : undefined;
};
export const getNearCities = state => {
  const woeid = getWoeid(state);
  return woeid ? fromCities.getNear(state.cities) : undefined;
};

export const getSearchQuery = state => state.searchQuery;

export const getIsCitiesFetching = state =>
  fromCities.getIsFetching(state.cities);
