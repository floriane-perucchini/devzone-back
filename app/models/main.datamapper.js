import { client } from "../services/index.service.js";

const mainDatamapper = {
  getUser: async function ({ username = null, email = null }) {
    const sql = `SELECT * FROM "user" WHERE username = $1 OR email = $2`;
    const values = [username, email];

    const result = await client.query(sql, values);
    return result.rows[0];
  },
  checkUser: async function ({
    username = null,
    email = null,
    password = null,
  }) {
    const sql = `SELECT * FROM "user" WHERE username = $1 OR email = $2 AND password = $3`;
    const values = [username, email, password];

    const result = await client.query(sql, values);
    console.log(result);
    return result.rows[0];
  },
};

export default mainDatamapper;
