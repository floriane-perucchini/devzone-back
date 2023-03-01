import { client } from "../services/index.service.js";

const toolDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "Tool"`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT * FROM "Tool" WHERE id = $1`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },
  create: async function ({ name, logo, description }) {
    const sql = `INSERT INTO "Tool" (name, logo, description) VALUES ($1, $2, $3)`;
    const values = [name, logo, description];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  update: async function ({ name, logo, description }, id) {
    const sql = `UPDATE "Tool" set name = $1, logo = $2, description = $3 WHERE id = $4`;
    const values = [name, logo, description, id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  delete: async function (id) {
    const sql = `DELETE FROM "Tool" WHERE id = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default toolDatamapper;
