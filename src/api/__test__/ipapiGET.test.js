import * as fromIpapi from "../ipapiGET";
import { isDict } from "./index";

describe("getLatlong request", () => {
  it("has required shape", async () => {
    const response = await fromIpapi.getLatlong();

    expect(isDict(response)).toBe(true);
    expect(Object.keys(response).length > 0).toBe(true);
    expect(response.latitude).toBeDefined();
    expect(response.longitude).toBeDefined();
  });
});
