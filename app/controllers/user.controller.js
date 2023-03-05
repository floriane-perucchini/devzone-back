import db from "../models/index.datamapper.js";
import bcrypt from "bcrypt";
import fs from "fs";

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

      response.json(user);
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
  uploadAvatar: async function (request, response, next) {
    const { id } = request.params;
    const image = request.file;

    if (image?.size > 3200000)
      return next("Your avatar must have a size lower than 3MB.");
    try {
      const user = await db.user.get(id);
      if (user.imgId)
        return next("Use the PATCH route to update the user avatar.");

      const insertedAvatar = await db.user.uploadAvatar(image, id);
      if (!insertedAvatar) return next("Avatar couldn't be uploaded.");

      response.json("Avatar was uploaded successfully.");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateAvatar: async function (request, response, next) {
    const { id } = request.params;
    const image = request.file;

    if (image?.size > 3200000)
      return next(new Error("Your avatar must have a size lower than 3MB."));

    try {
      const user = await db.user.get(id);
      await fs.promises.unlink(user.filePath);

      const updatedAvatar = await db.user.updateAvatar(image, user.imgId);
      if (!updatedAvatar)
        return next(new Error("Avatar couldn't be uploaded."));

      response.json("Avatar was updated successfully.");
    } catch (error) {
      return next(error);
    }

    response.json("Avatar was updated successfully.");
  },
  deleteAvatar: async function (request, response, next) {
    const { id } = request.params;

    const deletedAvatar = await db.user.deleteAvatar(id);
    if (!deletedAvatar) return next(new Error("Avatar couldn't be deleted."));

    response.json("Avatar was deleted successfully.");
  },
};

export default userController;
