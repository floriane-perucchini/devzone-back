import { client } from "../services/index.service.js";

const userDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "user"`;
    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT * FROM "user" WHERE id = $1`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },
  create: async function ({
    lastname,
    firstname,
    email,
    password,
    username,
    userTool,
  }) {
    if (!userTool.length) {
      userTool = null;
      const values = [lastname, firstname, email, password, username, userTool];
      const sql = `INSERT INTO "user" (lastname, firstname, email, password,username, tooloff) VALUES ($1, $2, $3, $4, $5, ARRAY[$6])`;

      const result = await client.query(sql, values);
      return result.rowCount;
    }

    const values = [
      lastname,
      firstname,
      email,
      password,
      username,
      userTool,
    ].flat();

    const userToolValues = [];
    for (let i = 0; i < userTool.length; i++) {
      userToolValues.push(`$${6 + i}`);
    }
    const sql = `INSERT INTO "user" (lastname, firstname, email, password,username,tooloff) VALUES ($1, $2, $3, $4, $5, ARRAY[${userToolValues}])`;

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  update: async function ({
    lastname,
    firstname,
    email,
    password,
    username,
    userTool,
  }) {},
};

export default userDatamapper;
