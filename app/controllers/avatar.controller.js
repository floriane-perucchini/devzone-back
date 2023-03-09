import db from "../models/index.datamapper.js";
import fs from "fs";
import sharp from "sharp";

const avatarController = {
  upload: async function (request, response, next) {
    const { id } = request.params;
    const image = request.file;
    image.fileName = `avatar-user-${id}.webp`;
    image.filePath = `/images/avatar-user-${id}.webp`;
    image.url = `${request.get("host")}/images/avatar-user-${id}.webp`;
    const { buffer } = image;

    try {
      const userAvatar = await db.avatar.getBy({ userId: id });

      if (userAvatar)
        return next("Use the PATCH route to update the user avatar.");

      const { size } = await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(`./public${image.filePath}`);

      image.size = size;
      const insertedAvatar = await db.avatar.upload(image, id);
      if (!insertedAvatar) return next("Avatar couldn't be uploaded.");

      const path = image.url;
      response.status(201).json(path);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const image = request.file;
    image.fileName = `avatar-user-${id}.webp`;
    image.filePath = `/images/avatar-user-${id}.webp`;
    image.url = `${request.get("host")}/images/avatar-user-${id}.webp`;
    const { buffer } = image;

    try {
      const userAvatar = await db.avatar.getBy({ userId: id });
      if (!userAvatar)
        return next("Use the POST route to first create the user avatar.");

      const { size } = await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(`./public${image.filePath}`);

      image.size = size;
      await fs.promises.unlink("public" + userAvatar.filePath);
      const updatedAvatar = await db.avatar.update(image, id);
      if (!updatedAvatar)
        return next(new Error("Avatar couldn't be uploaded."));

      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(`./public${image.filePath}`);

      const path = image.url;
      response.json(path);
    } catch (error) {
      return next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;
    try {
      const userAvatar = await db.avatar.getBy({ userId: id });
      if (!userAvatar) return next("This user doesn't have an avatar.");

      await fs.promises.unlink("public" + userAvatar.filePath);

      const deletedAvatar = await db.avatar.delete(id);
      if (!deletedAvatar) return next(new Error("Avatar couldn't be deleted."));

      response.json("Avatar was deleted successfully.");
    } catch (error) {
      next(error);
    }
  },
};

export default avatarController;
