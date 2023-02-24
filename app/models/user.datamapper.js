import { client } from "../services/index.service.js";

const userDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "User"`;
    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT * FROM "User" WHERE id = $1`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },

  create: async function ({ email, password, firstname, lastname, username }) {
    const sql = `INSERT INTO "User" (email, firstname, lastname, username, password) VALUES ($1, $2, $3, $4, $5)`;
    const values = [email, firstname, lastname, username, password];
    const result = await client.query(sql, values);
    return result.rowCount;
  },
  delete: async function (id) {
    const sql = `DELETE FROM User WHERE <condition>`;
    const values = [id["id"]];
    const result = await client.query(sql, [values]);
    return result.rows[0];
  },
};

export default userDatamapper;
