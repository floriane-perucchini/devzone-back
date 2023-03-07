import db from "../models/index.datamapper.js";
import { Error404, Error409 } from "../utils/errors/index.util.js";

const toolController = {
  getAll: async function (request, response, next) {
    try {
      const tools = await db.tool.getAll();

      response.json(tools);
    } catch (error) {
      error.message = "Couldn't get the tools.";
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;

    try {
      const tool = await db.tool.get(id);

      response.json(tool);
    } catch (error) {
      error.message = "Couldn't get the tool.";
      next(error);
    }
  },

  create: async function (request, response, next) {
    const { name, logo, description } = request.body;
    try {
      const checkTool = await db.tool.check(name);
      if (checkTool) next(new Error409("Tool already exists."));

      const newTool = await db.tool.create({ name, logo, description });

      response.status(201).json(newTool);
    } catch (error) {
      error.message = "Tool creation failed.";
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { name, description, categoryId, icon, link, order } = request.body;

    try {
      const tool = await db.tool.get(id);
      if (!tool) return next(new Error404("Tool couldn't be found."));

      if (name) tool.name = name.toLowerCase();
      if (description) tool.description = description.toLowerCase();
      if (categoryId) tool.categoryId = categoryId;
      if (icon) tool.icon = icon;
      if (link) tool.link = link;
      if (order) tool.order = order;

      await db.tool.update(tool, id);

      response.json("Tool updated successfully.");
    } catch (error) {
      error.message = "Tool couldn't be updated.";
      next(error);
    }
  },
  updateOnUser: async function (request, response, next) {
    const { id } = request.params;

    const { toolId } = request.body;

    try {
      const addTool = await db.toolsonusers.updateOnUser(id, toolId);

      response.json(addTool);
    } catch (error) {
      error.message = "tool insertion failed";

      next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;

    try {
      await db.tool.delete(id);

      response.json("Tool deleted successfully.");
    } catch (error) {
      error.message = "Tool deletion failed.";
      next(error);
    }
  },
  deleteOnUser: async function (request, response, next) {
    const { id } = request.params;

    const { toolId } = request.body;

    try {
      const deleteTool = await db.toolsonusers.deleteOnUser(id, toolId);

      response.json(deleteTool);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default toolController;
