import { toolSchemas } from "./schemas/index.schemas.js";

function validateTool(request, response, next) {
  try {
    if (request.url === "/user" && request.method === "POST") {
      const { createSchema } = toolSchemas;
      createSchema.parse(request.body);
    }

    if (/^\/user\/[0-9]*$/.test(request.url) && request.method === "PUT") {
      const { updateSchema } = toolSchemas;
      updateSchema.parse(request.body);
    }
  } catch (error) {
    next(error);
  }

  next();
}

export default validateTool;
