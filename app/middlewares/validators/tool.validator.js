import { toolSchemas } from "./schemas/index.schemas.js";
function validateTool(request, response, next) {
  if (request.url === "/posts" && request.method === "POST") {
    const { createSchema } = toolSchemas;
    const { error } = createSchema.validate(request.body);
    if (error) return next(error);
  }

  if (/^\/posts\/[0-9]*$/.test(request.url) && request.method === "PUT") {
    const { updateSchema } = toolSchemas;
    const { error } = updateSchema.validate(request.body);
    if (error) return next(error);
  }

  next();
}

export default validateTool;
