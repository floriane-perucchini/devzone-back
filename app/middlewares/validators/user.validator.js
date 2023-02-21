import { userSchemas } from "./schemas/index.schemas.js";

function validateUser(request, response, next) {
  if (request.url === "/categories" && request.method === "POST") {
    const { createSchema } = userSchemas;
    const { error } = createSchema.validate(request.body);
    if (error) return next(error);
  }

  if (/^\/categories\/[0-9]*$/.test(request.url) && request.method === "PUT") {
    const { updateSchema } = userSchemas;
    const { error } = updateSchema.validate(request.body);
    if (error) return next(error);
  }

  next();
}

export default validateUser;
