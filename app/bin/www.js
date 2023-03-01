import app from "../../app.js";
import http from "http";
import "dotenv/config";

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () =>
  console.log(`✅ Server ready: http://localhost:${port}`)
);
server.on("error", onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("⛔" + bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("🔴" + bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
