import db from "../models/index.datamapper.js";
import bcrypt from "bcrypt";
import client from "../services/database.service.js";

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
      const userWithTools = await db.user.getUserWithTools(id);
      if (!userWithTools) return next(new Error("Couldn't get the user with tools."));

      response.json(userWithTools);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { email, firstname, lastname, username, password, avatar } =
      request.body;

    // TODO: Verify if username is already in use and verify it
    // TODO: Verify email and replace it when it's valid

    try {
      const user = await db.user.get(id);
      if (!user) return next(new Error("404"));

      if (email) user.email = email.toLowerCase();
      if (firstname) user.firstname = firstname.toLowerCase();
      if (lastname) user.lastname = lastname.toLowerCase();
      if (username) user.username = username.toLowerCase();
      if (avatar) user.avatar = avatar.toLowerCase();
      if (password) user.password = await bcrypt.hash(password, 12);

      const userUpdated = await db.user.update(user, id);
      if (!userUpdated) return next(new Error("User update failed."));

      response.json("User updated successfully.");
    } catch (error) {
      next(error);
    }
  },
  addToolToUser: async function (request, response, next) {
    const { userId } = request.params;
    const { toolId } = request.body;
  
    try {
      const user = await db.user.get(userId);
      if (!user) return next(new Error("User not found."));
  
      const tool = await db.tool.get(toolId);
      if (!tool) return next(new Error("Tool not found."));
  
      const updatedUser = await db.user.addTool(user, tool);
      if (!updatedUser) return next(new Error("Failed to add tool to user."));
  
      response.json(updatedUser);
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
  uploadAvatar: async function (request, response, next) {
    const { id } = request.params;
    const image = request.file;

    if (image?.size > 3200000)
      return next(new Error("Your avatar must have a size lower than 3MB."));

    const insertedAvatar = await db.user.uploadAvatar(image, id);
    if (!insertedAvatar) return next(new Error("Avatar couldn't be uploaded."));

    response.json("Avatar was uploaded successfully.");
  },
};

export default userController;
