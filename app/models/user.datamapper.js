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
  update: async function (
    { email, password, firstname, lastname, username, avatar },
    id
  ) {
    const sql = `UPDATE "User" set email = $1, password = $2, firstname = $3, lastname = $4, username = $5, avatar = $6 WHERE id = $6`;
    const values = [email, password, firstname, lastname, username, avatar, id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  delete: async function (id) {
    const sql = `DELETE FROM "User" WHERE id = $1`;
    const values = [id];

    console.log(sql);
    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default userDatamapper;
