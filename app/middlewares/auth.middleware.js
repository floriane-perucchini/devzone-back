import jwt from "jsonwebtoken";
import db from "../models/index.datamapper.js";
import tokenConfig from "../config/token.config.js";
const { secret, algorithm } = tokenConfig.accessToken;

async function auth(request, response, next) {
  try {
    const { headers } = request;
    // Check if Authorization header is in the request
    if (!headers || !headers.authorization) {
      return response.status(401).json({
        message: "Missing Authorization header",
      });
    }

    // Check if Authorization header has the right token
    const [scheme, token] = headers.authorization.split(" ");

    if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
      return response.status(401).json({
        message: "Header format is Authorization: Bearer token",
      });
    }
    // Check and decode token
    const decodedToken = jwt.verify(token, secret, {
      algorithms: algorithm,
    });

    // Check if user user exists
    const userId = decodedToken.sub;
    const user = await db.user.get(userId);

    if (!user) {
      return response.status(401).json({
        message: `User with ID ${userId} does not exist`,
      });
    }
    // Return user in request for next middleware
    request.user = user;

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}

export default auth;
