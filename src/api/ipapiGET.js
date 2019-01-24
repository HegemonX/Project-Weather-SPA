import { makeIpapiGetRequest as request } from "./index";

export const getLatlong = async () => {
  const response = await request(`json/`);
  return response;
};
