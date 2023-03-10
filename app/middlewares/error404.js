import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function error404(request, response) {
  response.status(404).sendFile("error404.html", {
    root: path.join(__dirname, "../../public/html"),
  });
}

export default error404;
