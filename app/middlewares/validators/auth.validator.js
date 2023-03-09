import { mainSchemas } from "./schemas/index.schemas.js";
const { loginSchema, signupSchema } = mainSchemas;

function validateAuth(request, response, next) {
  try {
    if (request.url === "/auth/login" && request.method === "POST")
      loginSchema.parse(request.body);

    if (request.url === "/auth/signup" && request.method === "POST")
      signupSchema.parse(request.body);
  } catch (error) {
    next(error);
  }

  next();
}

export default validateAuth;
