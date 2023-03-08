import { client } from "../services/index.service.js";

const avatarDatamapper = {
  getBy: async function ({ fileName, filePath, userId }) {
    const sql = `SELECT * FROM "Image" WHERE "fileName" = $1 OR "filePath" = $2 OR "userId" = $3`;
    const values = [fileName, filePath, userId];

    const result = await client.query(sql, values);
    return result.rows[0];
  },
  upload: async function ({ fileName, filePath, size }, id) {
    const sql = `INSERT INTO "Image" ("fileName", "filePath", size, "userId") VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [fileName, filePath, size, id];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  update: async function ({ fileName, filePath, size }, id) {
    const sql = `UPDATE "Image" SET "fileName" = $1, "filePath" = $2, size = $3 WHERE "userId" = $4 RETURNING *`;
    const values = [fileName, filePath, size, id];

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
