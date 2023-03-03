import { client } from "../services/index.service.js";

const userDatamapper = {
  // getAll a revoir pour afficher la liste de tous les tools
  
  getAll: async function () {
    const sql = `SELECT "User".id, "User".email, "User".firstname, "User".lastname, "User".username, "User".active, "User"."imgId", "User".website, "Tool".id AS tool_id, "Tool".name AS tool_name, "Tool".description AS tool_description, "Tool".icon AS tool_icon, "Tool"."order" AS tool_order, "Tool".link AS tool_link, "Tool".category_id
    FROM "User"
    LEFT JOIN "ToolsOnUsers" ON "User".id = "ToolsOnUsers"."userId"
    LEFT JOIN "Tool" ON "ToolsOnUsers"."toolId" = "Tool".id;`;
    
    
    const results = await client.query(sql);
    console.log('db');
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT u.id, u.email, u.firstname, u.lastname, u.username, u.active, u."imgId", u.website, 
    t.id as tool_id, t.name as tool_name, t.description as tool_description, t.icon as tool_icon, t."order" as tool_order, t.link as tool_link, t.category_id as tool_category_id
FROM "User" u
LEFT JOIN "ToolsOnUsers" tou ON tou."userId" = u.id
LEFT JOIN "Tool" t ON t.id = tou."toolId"
WHERE u.id = $1;`;

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
  uploadAvatar: async function (
    { fieldname, filename, mimetype, path, size },
    id
  ) {
    const sql = `INSERT INTO "Image" (type, "fileName", "filePath", "mimeType", size, "userId") 
    VALUES ($1, $2, $3, $4, $5, $6) 
    ON CONFLICT ("userId") DO UPDATE
      SET type = excluded.type,
          "fileName" = excluded."fileName",
          "filePath" = excluded."filePath",
          "mimeType" = excluded."mimeType",
          size = excluded.size;`;

    const values = [fieldname, filename, path, mimetype, size, id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default userDatamapper;
