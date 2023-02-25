import db from "../models/index.datamapper.js";
import { Error404, Error409 } from "../utils/errors/index.util.js";

const toolController = {
  getAll: async function (request, response, next) {
    try {
      const tools = await db.tool.getAll();
      if (!tools) return next(new Error("Couldn't get the tools."));

      response.json(tools);
    } catch (error) {
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;

    try {
      const tool = await db.tool.get(id);
      if (!tool) return next(new Error("Couldn't get the tool."));

      response.json(tool);
    } catch (error) {
      next(error);
    }
  },

  create: async function (request, response, next) {
    const { name, logo, description } = request.body;
    try {
      const checkTool = await db.tool.check(name);
      if (checkTool) next(new Error409("Tool already exists."));

      const newTool = await db.tool.create({ name, logo, description });
      if (!newTool) return next(new Error("Tool creation failed."));

      response.status(201).json(newTool);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { name, logo, description } = request.body;

    try {
      const tool = await db.tool.get(id);
      if (!tool) return next(new Error404("Tool couldn't be found."));

      if (name) tool.name = name.toLowerCase();
      if (logo) tool.logo = logo.toLowerCase();
      if (description) tool.description = description.toLowerCase();

      const toolUpdated = await db.tool.update(tool, id);
      if (!toolUpdated) return next(new Error("Tool update failed."));

      response.json("Tool updated successfully.");
    } catch (error) {
      next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;

    try {
      const toolDeleted = await db.tool.delete(id);
      if (!toolDeleted) return next(new Error("Tool deletion failed."));

      response.json("Tool deleted successfully.");
    } catch (error) {
      next(error);
    }
  },
};

export default toolController;
