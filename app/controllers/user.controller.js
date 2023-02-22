import { prisma } from "../services/index.service.js";

const userController = {
  getAll: async function (request, response, next) {
    try {
      const users = await prisma.user.findMany({});

      response.json({ users });
    } catch (error) {
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          tool: true,
        }
      });

      response.json({ user });
    } catch (error) {
      next(error);
    }
  },

  create: async function (request, response, next) {
    const { lastname, firstname, email, password, username, avatar, tool_id } = request.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          lastname,
          firstname,
          email,
          password,
          username,
          avatar,
          tool_id
        },
      });

      response.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { email, password, username, tool_id } = request.body;

    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          email: String(email),
          password: String(password),
          username: String(username),
          tool_id: String(tool_id),
        },
      });

      response.json({ user });
    } catch (error) {
      next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;

    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      response.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
