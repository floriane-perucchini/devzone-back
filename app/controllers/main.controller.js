import db from "../models/index.datamapper.js";

const mainController = {
  login: async function (request, response, next) {
    const { username, email, password } = request.body;
    try {
      const checkUser = await db.main.checkUser({ username, email, password });
      if (!checkUser)
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

      await db.user.create(request.body);
      response.status(201).json("User has been created successfully.");
    } catch (error) {
      next(error);
    }
  },
};

export default mainController;