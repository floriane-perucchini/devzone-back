import { PrismaClient } from  "@prisma/client";
const prisma = new PrismaClient();

const userController = {

getAllUser: async function (request, response) {
    
    try {
        const users = await prisma.user.findMany({
            
        });
        response.json({ users });
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
},
 

getUser: async function (request, response) {
    const { id } = request.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        response.json({ user });
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
},
 
createUser: async function (request,response) {
    const { lastname, firstname, email, password, pseudo } = request.body;
    try {
        const newUser = await prisma.user.create ({
            data:
            {
                lastname,
                firstname,
                email,
                password,
                pseudo
            },
        });
        response.json(newUser);
    } catch (err) {
        return response.status(500).json(err);
    }
},

updateUser: async function (request, response) {
    const { id } = request.params;
    const { email, password, pseudo } = request.body;
    try {
        const user =  await prisma.user.update({
            where: { id: Number(id) },
            data : { 
                email: String(email),
                password: String(password),
                pseudo: String(pseudo)
            }
        });
        response.json({ user });
    } catch (error) {
        response.status(500).render(500).json(error)
    }
},

deleteUser: async function (request, response) {
    const { id } = request.params;
    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },

      });
      
      response.json(user);
    } catch (err) {
      return response.status(500).json(err);
    } 
}

};

export default userController;