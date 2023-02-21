import { ZodError } from "zod";

async function errorsHandler(error, request, response, next) {
  // Handle Zod Errors
  if (error instanceof ZodError)
    return response.status(403).json(error.flatten().fieldErrors);

  // Handler 404 Errors
  if (error.status === 404) console.log(404);

  // Handle General Errors
  response.status(error.status || 500);
  response.json({
    message: error.message,
    error,
  });
}

export default errorsHandler;
