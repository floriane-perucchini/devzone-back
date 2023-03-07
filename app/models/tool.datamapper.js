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

  check: async function (name) {
    const sql = `SELECT * FROM "Tool" WHERE name = $1`;

    const result = await client.query(sql, [name]);
    return result.rows[0];
  },

  create: async function ({
    name,
    description,
    categoryId,
    icon,
    link,
    order,
  }) {
    const sql = `INSERT INTO "Tool" (name, description, "categoryId", icon, link, "order") VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [name, description, categoryId, icon, link, order];

    const result = await client.query(sql, values);
    return result.rowCount;
  },

  update: async function (
    { name, description, categoryId, icon, link, order },
    id
  ) {
    const sql = `UPDATE "Tool" set name = $1, description = $2, "categoryId" = $3, icon = $4, link = $5, "order" = $6 WHERE id = $7`;
    const values = [name, description, categoryId, icon, link, order, id];

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
