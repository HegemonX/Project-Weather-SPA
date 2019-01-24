import city, * as fromCity from "./city";
import { combineReducers } from "redux";

const byWoeid = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CITY_INFO_SUCCESS":
    case "FETCH_WEATHER_BY_DATE_SUCCESS":
      return {
        ...state,
        [action.woeid]: city(state[action.woeid], action)
      };
    default:
      return state;
  }
};
const nearest = (state = [], action) => {
  switch (action.type) {
    case "FETCH_NEAREST_CITIES_SUCCESS":
      return [...action.response];
    default:
      return state;
  }
};

const fromSearch = (state = [], action) => {
  switch (action.type) {
    case "CITY_SEARCH_SUCCESS":
      return [...action.response];
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case "CITY_SEARCH_REQUEST":
      return true;
    case "CITY_SEARCH_SUCCESS":
    case "CITY_SEARCH_ERROR":
      return false;
    default:
      return state;
  }
};

const cities = combineReducers({
  byWoeid,
  nearest,
  fromSearch,
  isFetching
});
export default cities;
export const getIsFetching = state => state.isFetching;
export const getFromSearch = state => state.fromSearch;

export const getNearest = state => getNear(state)[0];
export const getNear = state => state.nearest;

export const getWeekWeatherByWoeid = (state, woeid) => {
  return state.byWoeid[woeid]
    ? fromCity.getWeekWeather(state.byWoeid[woeid])
    : undefined;
};

export const getDailyWeatherByWoeid = (state, woeid, dateKey) => {
  return state.byWoeid[woeid]
    ? fromCity.getDailyWeather(state.byWoeid[woeid], dateKey)
    : undefined;
};

export const getInfoByWoeid = (state, woeid) => {
  return state.byWoeid[woeid]
    ? fromCity.getInfo(state.byWoeid[woeid])
    : undefined;
};
