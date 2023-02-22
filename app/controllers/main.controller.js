const mainController = {
  login: async function (request, response, next) {
    const { username, password } = request.body;
    const user = prisma.user.findUnique({ where: { username } });
  },
};

export default mainController;
