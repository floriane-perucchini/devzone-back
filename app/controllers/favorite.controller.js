import { PrismaClient } from  "@prisma/client";
const prisma = new PrismaClient();

const favoriteController = {


getAllFavorite: async function (request, response) {
    
    try {
        const favorites = await prisma.favorite.findMany({
            
        });
        response.json({ favorites });
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
},
 

getFavorite: async function (request, response) {
    const { id } = request.params;
    try {
        const favorite = await prisma.favorite.findUnique({
            where: { id: Number(id) },
        });
        response.json({ favorite });
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
},
 
createFavorite: async function (request,response) {
    const { name, description, link, link_img } = request.body;
    try {
        const newFavorite = await prisma.user.create ({
            data:
            {
                name,
                description,
                link,
                link_img,
                
            },
        });
        response.json(newFavorite);
    } catch (err) {
        return response.status(500).json(err);
    }
},

updateFavorite: async function (request, response) {
    const { id } = request.params;
    const { name, description, link } = request.body;
    try {
        const favorite =  await prisma.favorite.update({
            where: { id: Number(id) },
            data : { 
                name: String(name),
                description: String(description),
                link: String(link)
                
            }
        });
        response.json({ favorite });
    } catch (error) {
        response.status(500).render(500).json(error)
    }
},

deleteFavorite: async function (request, response) {
    const { id } = request.params;
    try {
      const favorite = await prisma.favorite.delete({
        where: {
          id: Number(id),
        },

      });
      
      response.json(favorite);
    } catch (err) {
      return response.status(500).json(err);
    } 
}

};


export default favoriteController;