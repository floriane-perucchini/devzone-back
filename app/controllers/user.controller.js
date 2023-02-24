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
<<<<<<< Updated upstream
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          tool: true,
        },
      });

      response.json({ user });

      const users = await user.get(id);
      response.json({ users });
=======
      const user = await db.user.get(id);

      response.json(user);
>>>>>>> Stashed changes
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { email, password, username, tool_id } = request.body;

    const user = db.user.get(id);
    if (!user) return next(new Error("404"));

    if (email) user.email = email.toLowerCase();
    if (password) user.password = password;
    if (username) user.password = username.toLowerCase();

<<<<<<< Updated upstream
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
      const user = await db.user.create(user);

      response.json({ user });
    } catch (error) {
      next(error);
    }
=======
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
>>>>>>> Stashed changes
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
