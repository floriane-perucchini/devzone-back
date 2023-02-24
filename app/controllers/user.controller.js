import db from "../models/index.datamapper.js";

const userController = {
  getAll: async function (request, response, next) {
    try {
      const users = await db.user.getAll();
      response.json(users);
    } catch (error) {
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;

    try {
      const user = await db.user.get(id);

      response.json(user);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { email, password, username } = request.body;

    const user = db.user.get(id);
    if (!user) return next(new Error("404"));

    if (email) user.email = email.toLowerCase();
    if (password) user.password = password;
    if (username) user.password = username.toLowerCase();

    // try {
    //   const user = await prisma.user.update({
    //     where: { id: Number(id) },
    //     data: {
    //       email: String(email),
    //       password: String(password),
    //       username: String(username),
    //       tool_id: String(tool_id),
    //     },
    //   });
    //   const user = await db.user.create(user);
    //
    //   response.json({ user });
    // } catch (error) {
    //   next(error);
    // }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;
  },
};

export default userController;
