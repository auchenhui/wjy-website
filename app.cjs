const { createServer } = require("node:http");

// cPanel/Passenger launches this file directly instead of running `next start`.
// Default to production because this entry point is only used after `next build`.
process.env.NODE_ENV ||= "production";

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "0.0.0.0";
const port = Number.parseInt(process.env.PORT || "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((request, response) => handle(request, response)).listen(
      port,
      hostname,
      () => {
        console.log(`WJY Lighting listening on http://${hostname}:${port}`);
      },
    );
  })
  .catch((error) => {
    console.error("Unable to start WJY Lighting:", error);
    process.exit(1);
  });
