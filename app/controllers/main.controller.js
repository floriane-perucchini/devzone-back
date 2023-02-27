import db from "../models/index.datamapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import config from "../config/token.config.js";
import { Error409 } from "../utils/errors/index.util.js";

const mainController = {
  signup: async function (request, response, next) {
    const newUser = request.body;
    try {
      // Check if username/email alrady exists
      const checkUser = await db.main.getUser({
        username: newUser.username,
        email: newUser.email,
      });
      if (checkUser?.email)
        return next(new Error409("This email is already in use."));
      if (checkUser?.username)
        return next(new Error409("This username is already in use."));

      // Hash user password
      newUser.password = await bcrypt.hash(newUser.password, 12);
      delete newUser.confirmedPassword;

      // Create new user
      await db.user.create(newUser);
      response.status(201).json("Registered successfully.");
    } catch (error) {
      next(error);
    }
  },

  login: async function (request, response, next) {
    const { username, email, password } = request.body;
    try {
      // Check if user exists
      const user = await db.main.getUser({
        username: username?.toLowerCase(),
        email: email?.toLowerCase(),
      });
      if (!user) return next("Your email/username or password is not correct.");

      // Check if password is correct
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        return next("Your email/username or password is not correct.");

      // Check if credentials are valid
      const checkUser = await db.main.checkUser({
        username: username?.toLowerCase(),
        email: email?.toLowerCase(),
        password: user.password,
      });
      if (!checkUser)
        return next("Your email/username or password is not correct.");

      // Create JWT Token
      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        config.accessToken.secret,
        {
          algorithm: config.accessToken.algorithm,
          // audience: config.accessToken.audience,
          expiresIn: config.accessToken.expiresIn || 1000,
          // issuer: config.accessToken.issuer,
          subject: user.id.toString(),
        }
      );
      // Create JWT Refresh Token
      const refreshToken = crypto.randomBytes(128).toString("base64");

      await db.main.createRefreshToken({
        userId: user.id,
        token: refreshToken,
        expiration: Date.now() + config.refreshToken.expiresIn,
      });

      // Send JTW Token, RefreshToken and user to client
      delete user.password;
      return response.json({
        token: {
          accessToken,
          tokenType: config.accessToken.type,
          accessTokenExpiresIn: config.accessToken.expiresIn,
          refreshToken,
          refreshTokenExpiresIn: config.refreshToken.expiresIn,
        },
        user: user,
      });
    } catch (error) {
      return next();
    }
  },
};

export default mainController;
