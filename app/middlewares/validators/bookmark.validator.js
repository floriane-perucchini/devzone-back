import { bookmarkSchemas } from "./schemas/index.schemas.js";
const { createSchema } = bookmarkSchemas;
const { updateSchema } = bookmarkSchemas;

function validateBookmark(request, response, next) {
  try {
    if (request.url === "/user" && request.method === "POST")
      createSchema.parse(request.body);

    if (/^\/bookmark\/[0-9]*$/.test(request.url) && request.method === "PATCH")
      updateSchema.parse(request.body);
  } catch (error) {
    error.status = 409;
    next(error);
  }

  next();
}

export default validateBookmark;
