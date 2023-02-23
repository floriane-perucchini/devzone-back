import User from '../models/user.js';
import Tool from '../models/tool.js';


import jwt from 'jsonwebtoken';
import cache from '../services/cacheClient.js';

const apiController = {
    /**
     * Récupération de l'ensemble des tools
     * @param {*} req 
     * @param {*} res 
     */
    async getTools(req, res) {
        let tools;

        // je récupère la valeur du cache
        const cacheValue = await cache.get(req.originalUrl);

        // je vérifie si la valeur existe
        // console.log(cacheValue);
        if (cacheValue) {
            tools = JSON.parse(cacheValue);
        }
        else {
            tools = await Tool.findAll();
            // j'enregistre dans le cache
            await cache.set(req.originalUrl,JSON.stringify(tools));
        }

        res.json(tools);
    },
    /**
     * Insertion d'un Tool
     * @param {*} req 
     * @param {*} res 
     */
    async insertTool(req,res){
        // j'ajoute le user en BDD
        const toolDB = await Tool.create(req.body);


        // Maintenant le cache n'est pas à jour !
        // si j'ai inséré un tool, il faut mettre à jour le cache
        // je vais avoir deux choix :
        // 1. je supprime le cache comme ça il va se récréer de lui même
        // 2. je force le rafraichissement du cache

        // je récupère les tools qui étaient enregistrées dans le cache
        let tools = JSON.parse(await cache.get("/api/tools")); 
        if(!tools){
            tools = [];
        }

        // j'ajoute le tool que je viens d'insérer en BDD
        tools.push(toolDB); // [].push(1) => [1]

        // j'écrase / remplace le cache précédent
        await cache.set("/api/tools",tools);

        res.json(toolDB);
    },
    /**
     * Vérification de l'authentification
     * @param {*} req 
     * @param {*} res 
     */
    async checkLogin(req,res){
        // on génère une instance de User à partir de req.body qui contient username et password
        const user = new User(req.body);
        
        // on appelle la méthode qui va vérifier les infos en BDD et rempli les informations de notre user
        // la méthode renvoie true ou false suivant si les informations username/password sont correctes
        if(await user.checkPassword()){
            console.log(user);
            // Génération du token
            const token = jwt.sign({username:user.username}, process.env.SESSION_SECRET);
            console.log("TOKEN : ",token);

            // on enregistre le user courant dans la session
            req.session.user = user;
            // on envoie le token généré au client
            res.json({
                token
            });
        }
        else{
            // erreur dans le couple username/password, on renvoie false au client
            res.status(500).json({
                error:"ceci n'est pas correct!"
            });
        }
    }
};

export default apiController;