import "dotenv/config";

const tokenConfig = {
  accessToken: {
    type: process.env.ACCESS_TOKEN_TYPE || "Bearer",
    algorithm: process.env.ACCESS_TOKEN_ALGORITHM || "HS256",
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    audience: process.env.ACCESS_TOKEN_AUDIENCE,
    issuer: process.env.ACCESS_TOKEN_ISSUER,
  },
  refreshToken: {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
};

export default tokenConfig;
