import db from "../models/index.datamapper.js";
import { Error404, Error409 } from "../utils/errors/index.util.js";

const bookmarkController = {
  getAll: async function (request, response, next) {
    try {
      const bookmarks = await db.bookmark.getAll();
      if (!bookmarks)
        return next(new Error404("Couldn't find the bookmarks you requested."));
      response.json(bookmarks);
    } catch (error) {
      error.type = "database";
      error.method = request.method;
      error.message = "Bookmarks select request to the database failed.";
      return next(error);
    }
  },
  get: async function (request, response, next) {
    const { id } = request.params;
    try {
      const bookmark = await db.bookmark.get(id);
      if (!bookmark)
        return next(new Error404("Couldn't find the bookmark you requested."));
      response.json(bookmark);
    } catch (error) {
      error.type = "database";
      error.method = request.method;
      error.message = "Bookmark select request to the database failed.";
      next(error);
    }
  },
  getByUser: async function (request, response, next) {
    const { id } = request.params;

    try {
      const bookmark = await db.bookmark.getByUser(id);
      if (!bookmark)
        return next(
          new Error404(
            "Couldn't find the bookmark with the user Id you requested."
          )
        );

      response.json(bookmark);
    } catch (error) {
      error.type = "database";
      error.method = request.method;
      error.message = "Bookmark select request to the database failed.";
      next(error);
    }
  },
  create: async function (request, response, next) {
    // const { id } = request.params;
    const { name } = request.body;

    try {
      const checkBookmark = await db.bookmark.getBy({ name });
      if (checkBookmark) return next(new Error409("Bookmark already exists."));

      const newBookmark = await db.bookmark.create(request.body);
      response.status(201).json(newBookmark);
    } catch (error) {
      error.type = "database";
      error.method = request.method;
      error.message = "Bookmark insert request failed.";
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { name, description, link, imgLink } = request.body;

    try {
      const bookmark = await db.bookmark.get(id);
      if (!bookmark) return next(new Error404("Bookmark couldn't be found."));

      if (name) bookmark.name = name.toLowerCase();
      if (description) bookmark.description = description.toLowerCase();
      if (link) bookmark.link = link.toLowerCase();
      if (imgLink) bookmark.imgLink = imgLink;

      await db.bookmark.update(bookmark, id);

      response.json("Bookmark updated successfully.");
    } catch (error) {
      error.type = "database";
      error.method = request.method;
      error.message = "Bookmark update request failed.";
      next(error);
    }
  },
  delete: async function (request, response, next) {
    const { id } = request.params;

    try {
      await db.bookmark.delete(id);

      response.json("Bookmark deleted successfully.");
    } catch (error) {
      error.type = "database";
      error.method = request.method;
      error.message = "Bookmark delete request failed.";
      next(error);
    }
  },
};

export default bookmarkController;
