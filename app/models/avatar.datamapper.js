import { client } from "../services/index.service.js";

const avatarDatamapper = {
  getBy: async function ({ fileName, filePath, mimeType, userId }) {
    const sql = `SELECT * FROM "Image" WHERE "fileName" = $1 OR "filePath" = $2 OR "mimeType" = $3 OR "userId" = $4`;
    const values = [fileName, filePath, mimeType, userId];

    const result = await client.query(sql, values);
    return result.rows[0];
  },
  upload: async function ({ filename, mimetype, path, size }, id) {
    const sql = `INSERT INTO "Image" ("fileName", "filePath", "mimeType", size, "userId") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [filename, path, mimetype, size, id];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  update: async function ({ filename, mimetype, path, size }, id) {
    const sql = `UPDATE "Image" SET "fileName" = $1, "filePath" = $2, "mimeType" = $3, size = $4 WHERE "userId" = $5 RETURNING *`;
    const values = [filename, path, mimetype, size, id];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  delete: async function (id) {
    const sql = `DELETE FROM "Image" WHERE "userId" = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default avatarDatamapper;
