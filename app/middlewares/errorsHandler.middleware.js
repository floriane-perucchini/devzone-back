import { ZodError } from "zod";

async function errorsHandler(error, request, response, next) {
  // Handle Schema Validation Errors
  if (error instanceof ZodError) {
    console.error(error.flatten().fieldErrors);
    return response.status(422).json(error.flatten().fieldErrors);
  }

  // Handle Database 404 Errors : Element(s) not found
  if (error.type === "not found") {
    console.error(error);
    return response.status(error.status || 404).json(error);
  }

  // Handle Database 409 Errors : Element(s) already exists
  if (error.type === "duplicate") {
    console.error(error);
    return response.status(error.status || 409).json(error);
  }

  // Handle NodeMailer Errors
  if (error.type === "nodemailer") {
    console.error(error);
    return response.json({ message: error.message, error });
  }

  // Handle Database General Errors
  if (error.type === "database") {
    console.error(error);
    return response.status(error.status || 500).json({
      primary: {
        message: error.message,
        method: error.method,
        status: error.status,
        detail: error.detail,
      },
      secondary: error,
    });
  }

  // Handle API General Errors
  console.error(error);
  response.status(error.status || 500);
  return response.json(error);
}

export default errorsHandler;
