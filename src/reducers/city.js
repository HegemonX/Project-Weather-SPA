import weather, * as fromWeather from "./weather";
import { combineReducers } from "redux";

const general = (state = null, action) => {
  switch (action.type) {
    case "FETCH_CITY_INFO_SUCCESS":
      return {
        ...state,
        ...action.general
      };
    default:
      return state;
  }
};

const city = combineReducers({
  weather,
  general
});
export default city;

export const getWeekWeather = state => fromWeather.getWeek(state.weather);
export const getDailyWeather = (state, dateKey) =>
  fromWeather.getByDateKey(state.weather, dateKey);
export const getInfo = state => state.general;
