import { toolSchemas } from "./schemas/index.schemas.js";
const { createSchema } = toolSchemas;
const { updateSchema } = toolSchemas;

function validateTool(request, response, next) {
  try {
    if (request.url === "/user" && request.method === "POST")
      createSchema.parse(request.body);

    if (/^\/tool\/[0-9]*$/.test(request.url) && request.method === "PATCH")
      updateSchema.parse(request.body);
  } catch (error) {
    next(error);
  }

  next();
}

export default validateTool;
