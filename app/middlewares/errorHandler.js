import { appendFile } from "fs/promises";
import { resolve } from "path";

const debug = require("debug")("ErrorHandling");

const errorHandler = {
  /**
   * Méthode de gestion globale des erreurs
   * @param {*} err
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  manage(err, req, res, next) {
    // je log l'erreur pour moi
    errorHandler.writeLog(req.url, err);

    switch (err.code) {
      case 404:
        res
          .status(404)
          .sendFile(resolve(`${__dirname}../../../public/notFound.html`));
        break;
      default:
        // j'informe l'utilisateur
        res.status(500).json(err.message);
        break;
    }
  },
  /**
   * Permet l'écriture dans un fichier .log
   * @param {string} url url qui a amené à l'erreur
   * @param {Error} err erreur
   */
  writeLog(url, err) {
    // le debug n'est appelé qu'en environnement de développement
    debug(err);

    const date = new Date();

    const year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = date.getUTCDate();
    if (day < 10) {
      day = `0${day}`;
    }

    // je crèe une variable qui va contenir le nom de mon fichier
    const fileName = `${year}-${month}-${day}.log`;

    const dirPath = resolve(__dirname, "../../logs/", fileName);
    // debug(dirPath);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // je crèe une variable qui va contenir le message d'erreur
    const content = `${hours}:${minutes}:${seconds};${url};${err.message}\n`;

    /*
        appendFile regarde si le fichier existe
            s'il existe, il rajoute le contenu au contenu existant
            s'il n'existe pas, il le crèe et ajoute le contenu
        */
    appendFile(dirPath, content, (_error) => {
      if (err) throw err;
      console.log("Saved!");
    });
  },
  /**
   * Gestion de l'erreur 404
   * @param {*} _req requête
   * @param {*} _res réponse
   * @param {*} next méthode pour passer au prochain middleware
   */
  // eslint-disable-next-line no-underscore-dangle
  _404(_req, _res, next) {
    const error = new Error("Page non trouvée");
    error.code = 404;
    next(error);
  },
};

export default errorHandler;
