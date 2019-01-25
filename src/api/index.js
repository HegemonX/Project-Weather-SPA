import baseGetRequest from "./requests/baseGetRequest";
import { handleOK } from "./requests/baseHandlers";

export const PROXY_URL = `https://corsproxy-app.herokuapp.com/`;
const WEATHER_BASE_URL = "https://www.metaweather.com/";
export const WEATHER_URL = WEATHER_BASE_URL + "api/location/";
export const WEATHER_STATIC_URL = WEATHER_BASE_URL + "static/img/weather/";
export const IPAPI_URL = "https://ipapi.co/";

const makeRequest = async (requestFn, url) => {
  try {
    const response = await requestFn(url);
    return handleOK(response);
  } catch (error) {
    throw error;
  }
};

export const makeBaseGetRequest = url => {
  return makeRequest(baseGetRequest, url);
};

export const makeProxyIpapiGetRequest = url => {
  const requestURL = IPAPI_URL + url;
  const response = makeProxyGetRequest(requestURL);
  return response;
};

export const makeIpapiGetRequest = url => {
  const requestURL = IPAPI_URL + url;
  const response = makeBaseGetRequest(requestURL);
  return response;
};

export const makeProxyGetRequest = url => {
  const requestUrl = PROXY_URL + url;
  return makeBaseGetRequest(requestUrl);
};

export const makeProxyToWeatherGetRequest = url => {
  const requestUrl = WEATHER_URL + url;
  return makeProxyGetRequest(requestUrl);
};
