import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const toolController = {
  getAll: async function (request, response) {
    try {
      const tools = await prisma.tool.findMany({});
      response.json({ tools });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  },

  get: async function (request, response) {
    const { id } = request.params;
    try {
      const tool = await prisma.tool.findUnique({
        where: { id: Number(id) },
      });
      response.json({ tool });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  },

  create: async function (request, response) {
    const { name, logo, description } = request.body;
    try {
      const newTool = await prisma.tool.create({
        data: {
          name,
          description,
          logo,
        },
      });
      response.json(newTool);
    } catch (err) {
      return response.status(500).json(err);
    }
  },

  update: async function (request, response) {
    const { id } = request.params;
    const { name, logo, description } = request.body;
    try {
      const tool = await prisma.tool.update({
        where: { id: Number(id) },
        data: {
          name: String(name),
          description: String(description),
          logo: String(logo),
        },
      });
      response.json({ tool });
    } catch (error) {
      response.status(500).render(500).json(error);
    }
  },

  delete: async function (request, response) {
    const { id } = request.params;
    try {
      const tool = await prisma.tool.delete({
        where: {
          id: Number(id),
        },
      });

      response.json(tool);
    } catch (err) {
      return response.status(500).json(err);
    }
  },
};

export default toolController;
