import { prisma } from "../services/index.service.js";

const bookmarkController = {
  /**
   * Répond à la demande d'un bookmark
   * @param {*} request requête
   * @param {*} response réponse
   */
  getAll: async function (request, response, next) {
    try {
      const bookmarks = await prisma.bookmark.findMany({});

      response.json({ bookmarks });
    } catch (error) {
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;
    try {
      const bookmark = await prisma.bookmark.findUnique({
        where: { id: Number(id) },
      });

      response.json({ bookmark });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Répond à la demande d'insertion de données en BDD
   * en renvoyant un bookmark qui utilise ces données
   * @param {*} request requête
   * @param {*} response réponse
   */
  create: async function (request, response, next) {
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

      response.status(201).json(newBookmark);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
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
      next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;
    try {
      const bookmark = await prisma.bookmark.delete({
        where: {
          id: Number(id),
        },
      });

      response.json(bookmark);
    } catch (err) {
      next(error);
    }
  },
};

export default bookmarkController;
