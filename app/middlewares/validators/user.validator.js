import { userSchemas } from "./schemas/index.schemas.js";

function validateUser(request, response, next) {
  try {
    if (request.url === "/user" && request.method === "POST") {
      const { createSchema } = userSchemas;
      createSchema.parse(request.body);
    }

    if (/^\/user\/[0-9]*$/.test(request.url) && request.method === "PUT") {
      const { updateSchema } = userSchemas;
      updateSchema.parse(request.body);
    }
  } catch (error) {
    next(error);
  }

  next();
}

export default validateUser;
