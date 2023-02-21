import { ZodError } from "zod";

async function errorsHandler(error, request, response, next) {
  // Handle Zod Errors
  if (error instanceof ZodError)
    return response.status(403).json(error.flatten().fieldErrors);

  // Handle General Errors
  response.status(500).json(error);
}

export default errorsHandler;
