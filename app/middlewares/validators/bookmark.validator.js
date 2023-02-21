import { bookmarkSchemas } from "./schemas/index.schemas.js";

function validateBookmark(request, response, next) {
  if (request.url === "/posts" && request.method === "POST") {
    const { createSchema } = bookmarkSchemas;
    const { error } = createSchema.validate(request.body);
    if (error) return next(error);
  }

  if (/^\/posts\/[0-9]*$/.test(request.url) && request.method === "PUT") {
    const { updateSchema } = bookmarkSchemas;
    const { error } = updateSchema.validate(request.body);
    if (error) return next(error);
  }

  next();
}

export default validateBookmark;
