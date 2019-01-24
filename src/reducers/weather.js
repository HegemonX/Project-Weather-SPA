import { combineReducers } from "redux";

const week = (state = [], action) => {
  switch (action.type) {
    case "FETCH_CITY_INFO_SUCCESS":
      return [...action.weekWeather];
    default:
      return state;
  }
};

const byDateKey = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_WEATHER_BY_DATE_SUCCESS":
      return {
        ...state,
        [action.dateKey]: [...action.response]
      };
    default:
      return state;
  }
};

const weather = combineReducers({
  week,
  byDateKey
});
export default weather;

export const getWeek = state => state.week;
export const getByDateKey = (state, dateKey) =>
  dateKey ? state.byDateKey[dateKey] : undefined;
