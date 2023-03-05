import { client } from "../services/index.service.js";

const userDatamapper = {
  getAll: async function () {
    const sql = `SELECT u.id, u.email, u.firstname, u.lastname, u.username, u.active, u.website,
                        t.id as toolId, t.name as toolName, t.description as toolDescription, t.icon as toolIcon, t."order" as toolOrder, t.link as toolLink, t."categoryId" as toolCategoryId
                 FROM "User" u
                        LEFT JOIN "ToolsOnUsers" tou ON tou."userId" = u.id
                        LEFT JOIN "Tool" t ON t.id = tou."toolId"`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT u.id, u.email, u.firstname, u.lastname, u.username, u.active, u.website,
                        t.id as toolId, t.name as toolName, t.description as toolDescription, t.icon as toolIcon, t."order" as toolOrder, t.link as toolLink, t."categoryId" as toolCategoryId
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
    { email, password, firstname, lastname, username, active, website },
    id
  ) {
    const sql = `UPDATE "User" set email = $1, password = $2, firstname = $3, lastname = $4, username = $5, active = $6, website = $7 WHERE id = $8`;
    const values = [
      email,
      password,
      firstname,
      lastname,
      username,
      active,
      website,
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
  uploadAvatar: async function ({ filename, mimetype, path, size }, id) {
    const sql = `INSERT INTO "Image" (id, "fileName", "filePath", "mimeType", size) VALUES ($1, $2, $3, $4, $5)`;
    const values = [id, filename, path, mimetype, size];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  updateAvatar: async function ({ filename, mimetype, path, size }, id) {
    const sql = `UPDATE "Image" SET "fileName" = $1, "filePath" = $2, "mimeType" = $3, size = $4 WHERE "id" = $5`;
    const values = [filename, path, mimetype, size, id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
  deleteAvatar: async function (id) {
    const sql = `DELETE FROM "Image" WHERE "id" = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default userDatamapper;
