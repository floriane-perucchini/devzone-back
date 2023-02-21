import { bookmarkSchemas } from "./schemas/index.schemas.js";

function validateBookmark(request, response, next) {
  try {
    if (request.url === "/user" && request.method === "POST") {
      const { createSchema } = bookmarkSchemas;
      createSchema.parse(request.body);
    }

    if (/^\/user\/[0-9]*$/.test(request.url) && request.method === "PUT") {
      const { updateSchema } = bookmarkSchemas;
      updateSchema.parse(request.body);
    }
  } catch (error) {
    next(error);
  }

  next();
}

export default validateBookmark;
