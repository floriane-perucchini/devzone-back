import { userSchemas } from "./schemas/index.schemas.js";
import { ZodError } from "zod";

function validateUser(request, response, next) {
  try {
    if (request.url === "/user" && request.method === "POST") {
      const { createSchema } = userSchemas;
      createSchema.parse(request.body);
    }
  } catch (error) {
    if (error instanceof ZodError) return next(error);
  }

  if (/^\/categories\/[0-9]*$/.test(request.url) && request.method === "PUT") {
    const { updateSchema } = userSchemas;
    const { error } = updateSchema.parse(request.body);
  }

  next();
}

export default validateUser;
