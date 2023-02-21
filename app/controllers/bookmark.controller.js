import { prisma } from "../services/index.service.js";

const bookmarkController = {
  getAll: async function (request, response) {
    try {
      const bookmarks = await prisma.bookmark.findMany({});
      response.json({ bookmarks });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  },

  get: async function (request, response) {
    const { id } = request.params;
    try {
      const bookmark = await prisma.bookmark.findUnique({
        where: { id: Number(id) },
      });
      response.json({ bookmark });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  },

  create: async function (request, response) {
    const { name, description, link, link_img } = request.body;
    try {
      const newBookmark = await prisma.user.create({
        data: {
          name,
          description,
          link,
          link_img,
        },
      });
      response.json(newBookmark);
    } catch (err) {
      return response.status(500).json(err);
    }
  },

  update: async function (request, response) {
    const { id } = request.params;
    const { name, description, link } = request.body;
    try {
      const bookmark = await prisma.bookmark.update({
        where: { id: Number(id) },
        data: {
          name: String(name),
          description: String(description),
          link: String(link),
        },
      });
      response.json({ bookmark });
    } catch (error) {
      response.status(500).render(500).json(error);
    }
  },

  delete: async function (request, response) {
    const { id } = request.params;
    try {
      const bookmark = await prisma.bookmark.delete({
        where: {
          id: Number(id),
        },
      });

      response.json(bookmark);
    } catch (err) {
      return response.status(500).json(err);
    }
  },
};

export default bookmarkController;
