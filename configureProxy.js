const cors_proxy = require("cors-anywhere");

const host = "127.0.0.1";
const port = "8080";

cors_proxy
  .createServer({
    originWhitelist: [],
    requireHeaders: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"]
  })
  .listen(port, host, () => {
    console.log(`Running CORS Proxy on ${host}:${port}`);
  });
