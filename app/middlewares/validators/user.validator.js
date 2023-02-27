import { userSchemas } from "./schemas/index.schemas.js";
const { createSchema } = userSchemas;
const { updateSchema } = userSchemas;

function validateUser(request, response, next) {
  try {
    if (request.url === "/user" && request.method === "POST")
      createSchema.parse(request.body);

    if (/^\/user\/[0-9]*$/.test(request.url) && request.method === "PATCH")
      updateSchema.parse(request.body);
  } catch (error) {
    next(error);
  }

  next();
}

export default validateUser;
