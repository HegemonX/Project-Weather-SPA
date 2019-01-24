import * as fromGet from "../weatherGET";
import { isDict, getType } from "./index";

describe("getSitiesList request", () => {
  it("has required shape", async () => {
    const response = await fromGet.getSitiesList("Moscow");

    expect(Array.isArray(response)).toBe(true);
    expect(response.length > 0).toBe(true);
    expect(isDict(response[0])).toBe(true);
    expect(response[0].title).toBe("Moscow");
    expect(response[0].woeid).toBeDefined();
  });
  it("returns sites list from latlong query", async () => {
    const response = await fromGet.getSitiesListByCoords("36.96,-122.02");
    expect(getType(response)).toBe("Array");
    expect(response.length > 0).toBe(true);
    expect(response[0].title).toBeDefined();
    expect(response[0].woeid).toBeDefined();
  });
  it("returns no sities with unknown query", async () => {
    const response = await fromGet.getSitiesList("NotASity111");

    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBe(0);
  });
});

describe("getInfoByLocation request", () => {
  it("has required shape", async () => {
    const response = await fromGet.getInfoByLocation(2122265);

    expect(isDict(response)).toBe(true);
    expect(Array.isArray(response.consolidated_weather)).toBe(true);
  });
});

describe("getAllDayWeather request", () => {
  it("has required shape", async () => {
    const response = await fromGet.getAllDayWeather(2122265);

    expect(Array.isArray(response)).toBe(true);
  });
});
