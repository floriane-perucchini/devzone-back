import db from "../models/index.datamapper.js";
import bcrypt from "bcrypt";

const mainController = {
  login: async function (request, response, next) {
    const { username, email, password } = request.body;
    try {
      const checkUser = await db.main.checkUser({ username, email, password });
      if (!checkUser)
        throw new Error("Your email/username or password is not correct.");

      const user = db.main.getUser({ username, email });
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        throw new Error("Your email/username or password is not correct.");

      response.json("OK");
    } catch (error) {
      error.status = 403;
      next(error);
    }
  },
  signup: async function (request, response, next) {
    try {
      const checkUser = await db.main.getUser(request.body);
      if (checkUser.email) throw new Error("This email is already in use.");
      if (checkUser.username)
        throw new Error("This username is already in use.");

      // Hash password
      const newUser = request.body;
      const { password } = newUser;
      newUser.password = await bcrypt.hash(password, 10);
      newUser.confirmedPassword.delete;

      await db.user.create(newUser);
      response.status(201).json("Registered successfully.");
    } catch (error) {
      next(error);
    }
  },
};

export default mainController;
