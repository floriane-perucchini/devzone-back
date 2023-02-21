import { mainSchemas } from "./schemas/index.schemas.js";
const { loginSchema } = mainSchemas;

function validateLogin(request, response, next) {
  try {
    if (request.url === "/login" && request.method === "POST")
      loginSchema.parse(request.body);
  } catch (error) {
    next(error);
  }

  next();
}

export default validateLogin;
