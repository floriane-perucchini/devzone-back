import { client } from "../services/index.service.js";

const bookmarkDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "Bookmark"`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT * FROM "Bookmark" WHERE id = $1`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },
  create: async function ({ name, description, link, linkImg, userId }) {
    const sql = `INSERT INTO "Bookmark" (name, description, link, "linkImg", "userId") VALUES ($1, $2, $3, $4, $5)`;
    const values = [name, description, link, linkImg, userId];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  update: async function ({ name, description, link, linkImg }, id) {
    const sql = `UPDATE "Bookmark" set name = $1, description = $2, link = $3, "linkImg" = $4 WHERE id = $5`;
    const values = [name, description, link, linkImg, id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  delete: async function (id) {
    const sql = `DELETE FROM "Bookmark" WHERE id = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default bookmarkDatamapper;
