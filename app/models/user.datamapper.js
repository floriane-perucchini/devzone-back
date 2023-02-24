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
  create: async function (body){
    const sql = `INSERT INTO "User"(
      lastname, firstname, email, password, username, avatar, tool_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7);` 
    const values = [body['lastname', 'firstname', 'email', 'password', 'username', 'avatar','tool_id']];
    const result = await client.query(sql, [values]);
    return result.rows[0];
  },
      


  update: async function (body){
    const sql = `UPDATE User SET id=$1, lastname=$1, firstname=$1, email=$1, password=$1, username=$1, tool_id=$1
    WHERE <condition>;`;
    const values = [body['lastname', 'firstname', 'email', 'password', 'username', 'tool_id']];
    const result = await client.query(sql, [values]);
    return result.rows[0];

  },
  delete: async function(id){
    const sql = `DELETE FROM User
    WHERE <condition>`;
    const values = [id['id']];
    const result = await client.query(sql, [values]);
    return result.rows[0];
  },
    
};

export default userDatamapper;