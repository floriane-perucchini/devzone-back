const toolController = {
  /**
   * Répond à la demande d'un tool
   * @param {*} request requête
   * @param {*} response réponse
   */

  getAll: async function (request, response, next) {
    try {
      const tools = await prisma.tool.findMany({});
      response.json({ tools });
    } catch (error) {
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;
    try {
      const tool = await prisma.tool.findUnique({
        where: { id: Number(id) },
      });
      response.json({ tool });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Répond à la demande d'insertion de données en BDD
   * en renvoyant un tool qui utilise ces données
   * @param {*} request requête
   * @param {*} response réponse
   */
  create: async function (request, response, next) {
    const { name, logo, description } = request.body;
    try {
      const newTool = await prisma.tool.create({
        data: {
          name,
          description,
          logo,
        },
      });
      response.status(201).json(newTool);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
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
      next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;
    try {
      const tool = await prisma.tool.delete({
        where: {
          id: Number(id),
        },
      });

      response.json(tool);
    } catch (error) {
      next(error);
    }
  },
};

export default toolController;
