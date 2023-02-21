import { PrismaClient } from  "@prisma/client";
const prisma = new PrismaClient();

const bookmarkController = {
     /**
     * Répond à la demande d'un bookmark 
     * @param {*} request requête
     * @param {*} response réponse
     */


getAllBookmark: async function (request, response) {
    
    try {
        const bookmarks = await prisma.bookmark.findMany({
            
        });
        response.json({ bookmarks });
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
},
 

getBookmark: async function (request, response) {
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
 
/**
     * Répond à la demande d'insertion de données en BDD
     * en renvoyant un bookmark qui utilise ces données
     * @param {*} request requête
     * @param {*} response réponse
     */

createBookmark: async function (request,response) {
    const { name, description, link, link_img } = request.body;
    try {
        const newBookmark = await prisma.bookmark.create ({
            data:
            {
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

updateBookmark: async function (request, response) {
    const { id } = request.params;
    const { name, description, link } = request.body;
    try {
        const bookmark =  await prisma.bookmark.update({
            where: { id: Number(id) },
            data : { 
                name: String(name),
                description: String(description),
                link: String(link)
                
            }
        });
        response.json({ bookmark });
    } catch (error) {
        response.status(500).render(500).json(error)
    }
},

deleteBookmark: async function (request, response) {
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
}

};


export default bookmarkController;