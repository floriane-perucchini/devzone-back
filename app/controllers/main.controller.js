import db from "../models/index.datamapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import config from "../config/token.config.js";
import { Error404, Error409 } from "../utils/errors/index.util.js";
import { transporter } from "../services/index.service.js";

const mainController = {
  signup: async function (request, response, next) {
    const wannabeUser = request.body;
    try {
      // Check if username/email already exists
      const checkUser = await db.main.getUser({
        username: wannabeUser.username,
        email: wannabeUser.email,
      });
      if (checkUser?.email)
        return next(new Error409("This email is already in use."));
      if (checkUser?.username)
        return next(new Error409("This username is already in use."));

      // Hash user password
      wannabeUser.password = await bcrypt.hash(wannabeUser.password, 12);
      delete wannabeUser.confirmedPassword;

      // Create new user
      const newUser = await db.user.create(wannabeUser);
      if (!newUser) return next(new Error("User creation failed."));

      // Send email confirmation
      const emailToken = String(crypto.randomUUID());
      await db.main.createEmailToken({ userId: newUser.id, emailToken });

      const link = `http://localhost:3000/verify?token=${emailToken}`;
      const mailData = {
        from: "devzoneapplication@gmail.com",
        to: newUser.email,
        subject: "Welcome to DevZone!",
        text: "text",
        html: `<b>Hey there! Click on this <a href='${link}'>link</a> to confirm your email.</b>`,
      };

      transporter.sendMail(mailData).catch((error) => next(error));

      response.status(201).json("Registration and email sent successfully.");
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
      if (!checkUser.active) return next("Please confirm your email.");

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
        jwtRefreshToken: refreshToken,
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
  verify: async function (request, response, next) {
    const { token } = request.query;
    try {
      const verifiedUser = await db.main.getVerifiedUser(token);
      if (!verifiedUser)
        return next(new Error404(`User with token ${token} not found.`));

      verifiedUser.active = true;
      const updatedUser = await db.user.update(
        verifiedUser,
        verifiedUser.userId
      );
      if (!updatedUser)
        return next(new Error("User update active status failed."));

      response.json("User email verified successfully.");
    } catch (error) {
      next(error);
    }
  },

  contact: async function (request, response, next) {
    const { email, message } = request.body;

    const mailData = {
      from: email,
      to: "devzoneapplication@gmail.com",
      subject: "Contact Form",
      html: `<b>${message}</b>`,
    };

    try {
      const email = transporter.sendMail(mailData);
      return response.json({
        message: "Mail sent successfully.",
        messageId: email.messageId,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default mainController;
