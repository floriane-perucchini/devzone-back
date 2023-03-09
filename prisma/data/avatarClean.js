import fs from "fs";
import path from "path";

for (const file of await fs.promises.readdir("public/images")) {
  await fs.promises.unlink(path.join("public/images", file));
}
