import { client } from "../services/index.service.js";

const userDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "User"`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT "Tool"."name"
     FROM "User"
     INNER JOIN "ToolsOnUsers" ON "User"."id" = "ToolsOnUsers"."userId"
     INNER JOIN "Tool" ON "ToolsOnUsers"."toolId" = "Tool"."id"
     WHERE "User"."id" = $1`;

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
