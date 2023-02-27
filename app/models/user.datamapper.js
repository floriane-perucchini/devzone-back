import { client } from "../services/index.service.js";

const userDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "User"`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT * FROM "User" WHERE id = $1`;
    //TODO: Add tools

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },
  create: async function ({ email, password, firstname, lastname, username }) {
    const sql = `INSERT INTO "User" (email, firstname, lastname, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, email`;
    const values = [email, firstname, lastname, username, password];
    const result = await client.query(sql, values);
    return result.rows[0];
  },
  update: async function (
    { email, password, firstname, lastname, username, avatar, active },
    id
  ) {
    const sql = `UPDATE "User" set email = $1, password = $2, firstname = $3, lastname = $4, username = $5, avatar = $6, active = $7 WHERE id = $8`;
    const values = [
      email,
      password,
      firstname,
      lastname,
      username,
      avatar,
      active,
      id,
    ];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  delete: async function (id) {
    const sql = `DELETE FROM "User" WHERE id = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default userDatamapper;
