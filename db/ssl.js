// db/ssl.js
const fs = require("node:fs");
const path = require("node:path");

// Decide the correct SSL configuration based on where we're connecting.
// Local Docker Postgres has no TLS configured at all, so SSL must be off.
// Aiven (and other managed hosts) require TLS, and their certificate is
// signed by their own private CA rather than a public one — so instead of
// disabling verification (insecure, hides real man-in-the-middle risks),
// we verify the connection against Aiven's own CA certificate.
function getSslConfig(connectionString) {
  const isLocal = !connectionString || connectionString.includes("localhost");

  if (isLocal) {
    return false;
  }

  const caPath = path.join(__dirname, "certs", "aiven-ca.pem");

  return {
    ca: fs.readFileSync(caPath).toString(),
  };
}

module.exports = { getSslConfig };