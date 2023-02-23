import { mainSchemas } from "./schemas/index.schemas.js";
const { loginSchema, signupSchema } = mainSchemas;

function validateLogin(request, response, next) {
  try {
    if (request.url === "/login" && request.method === "POST")
      loginSchema.parse(request.body);

    if (request.url === "/signup" && request.method === "POST")
      signupSchema.parse(request.body);
  } catch (error) {
    next(error);
  }

  next();
}

export default validateLogin;