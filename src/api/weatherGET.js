import { makeProxyToWeatherGetRequest as request } from "./index";

const processDate = date => {
  return date.split(" ");
};
export const getSitiesList = async (city = "Moscow") => {
  return request(`search/?query=${city}`);
};
export const getSitiesListByCoords = async latlong => {
  if (!latlong) return Promise.reject("latlong is required");
  return request(`search/?lattlong=${latlong}`);
};
export const getInfoByLocation = async woeid => {
  if (isNaN(parseInt(woeid))) return Promise.reject("woeid is required");
  return request(`location/${woeid}`);
};
export const getWeatherByDate = async (woeid, date) => {
  if (isNaN(parseInt(woeid))) return Promise.reject("woeid is required");
  const [year, month, day] = processDate(date);
  return request(`location/${woeid}/${year}/${month}/${day}`);
};
