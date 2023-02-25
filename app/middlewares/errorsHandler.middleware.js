import { ZodError } from "zod";

async function errorsHandler(error, request, response, next) {
  // Handle Zod Errors
  if (error instanceof ZodError)
    return response.status(422).json(error.flatten().fieldErrors);

  // Handle Database 404 Errors : Element(s) not found
  if (error.type === "not found") {
    return response.status(error.type || 404).json(error);
  }

  // Handle Database 409 Errors : Element(s) already exists
  if (error.type === "duplicate") {
    return response.status(error.type || 409).json(error);
  }

  // Handle Database General Errors
  if (error.type === "database") {
    response.status(error.status || 500).json({
      primary: {
        message: error.message,
        method: error.method,
        status: error.status,
        detail: error.detail,
      },
      secondary: error,
    });
  }

  // Handle General Errors
  response.status(error.status || 500);
  response.json({
    primary: {
      message: error.message,
      method: error.method,
      status: error.status,
      detail: error.detail,
    },
    secondary: error,
  });
}

export default errorsHandler;
