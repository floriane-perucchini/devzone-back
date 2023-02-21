import { PrismaClient } from  "@prisma/client";
const prisma = new PrismaClient();

const toolController = {

    /**
     * Répond à la demande d'un tool
     * @param {*} request requête
     * @param {*} response réponse
     */


getAlltools: async function (request, response) {
    
    try {
        const tools = await prisma.tool.findMany({
            
        });
        response.json({ tools });
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
},
 

getTool: async function (request, response) {
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
/**
     * Répond à la demande d'insertion de données en BDD
     * en renvoyant un tool qui utilise ces données
     * @param {*} request requête
     * @param {*} response réponse
     */
 
createTool: async function (request,response) {
    const { name, logo, description } = request.body;
    try {
        const newTool = await prisma.tool.create ({
            data:
            {
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

updateTool: async function (request, response) {
    const { id } = request.params;
    const { name, logo, description } = request.body;
    try {
        const tool =  await prisma.tool.update({
            where: { id: Number(id) },
            data : { 
                name: String(name),
                description: String(description),
                logo: String(logo)
                
            }
        });
        response.json({ tool });
    } catch (error) {
        response.status(500).render(500).json(error)
    }
},

deleteTool: async function (request, response) {
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
}

};

export default toolController;