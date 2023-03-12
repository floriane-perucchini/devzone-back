import { client } from "../services/index.service.js";

const avatarDatamapper = {
  getBy: async function ({ fileName, filePath, userId }) {
    const sql = `SELECT * FROM "Avatar" WHERE "fileName" = $1 OR "filePath" = $2 OR "userId" = $3`;
    const values = [fileName, filePath, userId];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  createExternal: async function (url, id) {
    const sql = `INSERT INTO "Avatar" ("url", "userId", type) VALUES ($1, $2, $3) RETURNING *`;
    const values = [url, id, "github"];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  updateExternal: async function (url, id) {
    const sql = `UPDATE "Avatar" SET "url" = $1 WHERE "userId" = $2 RETURNING *`;
    const values = [url, id];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  upload: async function ({ fileName, filePath, size, url }, id) {
    const sql = `INSERT INTO "Avatar" ("fileName", "filePath", url, size, "userId") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [fileName, filePath, url, size, id];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  update: async function ({ fileName, filePath, url, size }, id) {
    const sql = `UPDATE "Avatar" SET "fileName" = $1, "filePath" = $2, url = $3, size = $4 WHERE "userId" = $5 RETURNING *`;
    const values = [fileName, filePath, url, size, id];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  delete: async function (id) {
    const sql = `DELETE FROM "Avatar" WHERE "userId" = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default avatarDatamapper;
