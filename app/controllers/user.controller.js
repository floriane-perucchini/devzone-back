import db from "../models/index.datamapper.js";
import bcrypt from "bcrypt";
import { capitalize } from "../utils/index.js";
import { Error409 } from "../utils/errors/index.util.js";

const userController = {
  getAll: async function (request, response, next) {
    try {
      const users = await db.user.getAll();
      if (!users) return next(new Error("Couldn't get the users."));

      response.json(users);
    } catch (error) {
      next(error);
    }
  },
  get: async function (request, response, next) {
    const { id } = request.params;
    try {
      const user = await db.user.get(id);
      if (!user) return next(new Error("Couldn't get the user."));
      delete user?.password;

      response.json(user);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { email, firstname, lastname, username, password, website } =
      request.body;
    try {
      const user = await db.user.get(id);
      if (!user) return next(new Error("404"));

      if (email) {
        if (email === user.email) return next("Your email is identical");
        const emailTaken = await db.user.getBy({ email });
        if (emailTaken)
          return next(
            new Error409("Email is already taken, please choose another one.")
          );
        user.email = email.toLowerCase();
      }

      if (username) {
        if (username === user.username)
          return next("Your username is identical");
        const usernameTaken = await db.user.getBy({ username });
        console.log(usernameTaken);
        if (usernameTaken)
          return next(
            new Error409(
              "Username is already taken, please choose another one."
            )
          );
        user.username = username.toLowerCase();
      }

      if (firstname) user.firstname = capitalize(firstname);
      if (lastname) user.lastname = capitalize(lastname);
      if (website) user.username = website.toLowerCase();
      if (password) user.password = await bcrypt.hash(password, 12);

      const userUpdated = await db.user.update(user, id);
      if (!userUpdated) return next(new Error("User update failed."));

      response.json("User updated successfully.");
    } catch (error) {
      next(error);
    }
  },
  updateTool: async function (request, response, next) {
    const { userId } = request.params;
    const { toolId } = request.body;

    try {
      const toolUpdate = await db.ToolsOnUsers.get(userId, toolId);

      response.json(toolUpdate);
    } catch (error) {
      next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;

    try {
      const userDeleted = await db.user.delete(id);
      if (!userDeleted) return next(new Error("User deletion failed."));

      response.json("User deleted successfully.");
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
