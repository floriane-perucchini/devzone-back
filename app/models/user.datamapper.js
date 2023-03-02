import { client } from "../services/index.service.js";

const userDatamapper = {
  // getAll a revoir pour afficher la liste de tous les tools
  
  getAll: async function () {
    const sql = `SELECT u."id", u."email", u."firstname", u."lastname", u."username", u."avatar", t.*
    FROM public."User" u
    LEFT JOIN public."ToolsOnUsers" tou ON tou."userId" = u."id"
    LEFT JOIN public."Tool" t ON t."id" = tou."toolId";`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT u."id", u."email", u."firstname", u."lastname", u."username", u."avatar", array_agg(t."name") AS "tools"
    FROM public."User" u
    JOIN public."ToolsOnUsers" tou ON tou."userId" = u."id"
    JOIN public."Tool" t ON t."id" = tou."toolId"
    WHERE u."id" = $1
    GROUP BY u."id", u."email", u."firstname", u."lastname", u."username", u."avatar" ;`;

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
    { email, password, firstname, lastname, username, active, website, imgId },
    id
  ) {
    const sql = `UPDATE "User" set email = $1, password = $2, firstname = $3, lastname = $4, username = $5, active = $6, website = $7, "imgId" = $8 WHERE id = $9`;
    const values = [
      email,
      password,
      firstname,
      lastname,
      username,
      active,
      website,
      imgId,
      id,
    ];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  updateTool: async function ({ userId, toolId }) {
    const sql = `INSERT INTO public."ToolsOnUsers" ("userId", "toolId") VALUES ($1, $2);
    `;
    const values = [userId, toolId];
    const result = await client.query(sql, values);
    return result.rows[0];
    },
    
  
  delete: async function (id) {
    const sql = `DELETE FROM "User" WHERE id = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default userDatamapper;
