import db from "../models/index.datamapper.js";
<<<<<<< Updated upstream
=======
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import config from "../config/token.config.js";
>>>>>>> Stashed changes

const mainController = {
  login: async function (request, response, next) {
    const { username, email, password } = request.body;
    try {
<<<<<<< Updated upstream
      const checkUser = await db.main.checkUser({ username, email, password });
      if (!checkUser)
        throw new Error("Your email/username or password is not correct.");
      response.json("OK");
=======
      // Check if user exists
      const user = await db.main.getUser({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
      });
      if (!user) return next("Your email/username or password is not correct.");

      console.log(user);
      // Check if password is correct
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        return next("Your email/username or password is not correct.");

      // Check if credentials are valid
      const checkUser = await db.main.checkUser({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
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
      // Send JTW Token & RefreshToken to client
      return response.json({
        accessToken,
        tokenType: config.accessToken.type,
        accessTokenExpiresIn: config.accessToken.expiresIn,
        refreshToken,
        refreshTokenExpiresIn: config.refreshToken.expiresIn,
      });
>>>>>>> Stashed changes
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  signup: async function (request, response, next) {
    try {
      const { username, email } = request.body;
      const checkUser = await db.main.getUser({ username, email });
      if (checkUser?.email) throw new Error("This email is already in use.");
      if (checkUser?.username)
        throw new Error("This username is already in use.");

<<<<<<< Updated upstream
      await db.user.create(request.body);
      response.status(201).json("User has been created successfully.");
=======
      // Hash password
      const newUser = request.body;
      const { password } = newUser;
      newUser.password = await bcrypt.hash(password, 12);
      newUser.confirmedPassword.delete;

      await db.user.create(newUser);
      response.status(201).json("Registered successfully.");
>>>>>>> Stashed changes
    } catch (error) {
      next(error);
    }
  },
};

export default mainController;
