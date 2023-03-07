import db from "../models/index.datamapper.js";
import { Error404 } from "../utils/errors/index.util.js";

const categoryController = {
  getAll: async function (request, response, next) {
    try {
      const categories = await db.category.getAll();
      if (!categories) return next(new Error("Couldn't get the categories."));

      response.json(categories);
    } catch (error) {
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;
    try {
      const category = await db.category.get(id);
      if (!category) return next(new Error("Couldn't get the category."));

      response.json(category);
    } catch (error) {
      next(error);
    }
  },

  getByUser: async function (request, response, next) {
    const { id } = request.params;

    try {
      const category = await db.category.getByUser(id);
      if (!category)
        return next(
          new Error404(
            "Couldn't find the category with the toolId you requested."
          )
        );
      response.json(category);
    } catch (error) {
      error.type = "database";
      error.method = request.method;
      error.message = "category select request to the database failed.";
      next(error);
    }
  },
};

export default categoryController;
