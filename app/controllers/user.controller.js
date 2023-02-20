import prisma from "../services/database.service.js";

const userController = {
  // GET Requests
  getUser: async function () {},

  // POST Request
  createUser: async function (request, response) {
    const { lastname, firstname, email, password, pseudo } = request.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          lastname,
          firstname,
          email,
          password,
          pseudo,
        },
      });
      response.json(newUser);
    } catch (error) {
      return response.status(500).json(error);
    }
  },
};

export default userController;
