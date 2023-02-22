import { client } from "../services/index.service.js";

const userDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "user"`;

    const results = await client.query(sql);
    console.log(results);
    return results.rows;
  },
  get: async function () {},
};

export default userDatamapper;
