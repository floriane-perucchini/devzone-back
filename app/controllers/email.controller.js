import db from "../models/index.datamapper.js";
import crypto from "crypto";
import { Error404 } from "../utils/errors/index.util.js";
import { transporter } from "../services/index.service.js";
import bcrypt from "bcrypt";

const emailController = {
  verify: async function (request, response, next) {
    const { token } = request.query;
    try {
      const verifiedUser = await db.token.getUser(token);
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

  confirmation: async function (request, response, next) {
    const { id } = request.params;

    let user;
    let token;
    try {
      user = await db.user.get(id);
      if (!user) return next(new Error404("User not found."));

      token = await db.token.getToken(id);
      if (!token) {
        token = String(crypto.randomUUID());
        await db.token.createEmail({ userId: id, token });
      }
    } catch (error) {
      next(error);
    }

    const link = `http:/${request.get("host")}/verify?token=${token}`;
    const mailData = {
      from: "devzoneapplication@gmail.com",
      to: user.email,
      subject: "Welcome to DevZone!",
      html: `<b>Hey there! Click on this <a href='${link}'>link</a> to confirm your email.</b>`,
    };

    try {
      await transporter.sendMail(mailData);
    } catch (error) {
      error.message = "Confirmation email couldn't be sent.";
      error.type = "nodemailer";
      return next(error);
    }

    response.json("Confirmation email sent successfully.");
  },

  resetPasswordLink: async function (request, response, next) {
    const { id } = request.params;

    try {
      const user = await db.user.get(id);
      if (!user) return next(new Error404("User not found."));

      let token = await db.token.getToken(id);
      if (!token) {
        token = String(crypto.randomUUID());
        await db.token.createEmail({ userId: id, token });
      }

      const link = `http:/${request.get("host")}/reset/${id}/?token=${token}`;
      const mailData = {
        from: "devzoneapplication@gmail.com",
        to: user.email,
        subject: "DevZone: Reset your password!",
        html: `<b>Hey there! Click on this <a href='${link}'>link</a> to reset your password.</b>`,
      };

      try {
        await transporter.sendMail(mailData);
      } catch (error) {
        error.message = "Password reset link couldn't be sent.";
        error.type = "nodemailer";
        return next(error);
      }

      response.json("Password reset link sent to your email account");
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async function (request, response, next) {
    const { id } = request.params;
    const { token } = request.query;
    const { password } = request.body;

    try {
      const user = await db.user.get(id);
      if (!user)
        return response.json.status(400).send("invalid link or expired");

      const checkToken = await db.token.getUser(token);
      if (!checkToken)
        return response.json.status(400).send("invalid link or expired");

      user.password = await bcrypt.hash(password, 12);
      await db.user.update(user, id);

      response.json("Password reset sucessfully.");
    } catch (error) {
      next(error);
    }
  },
};

export default emailController;
