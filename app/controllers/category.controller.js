import db from "../models/index.datamapper.js";

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
};

export default categoryController;
