import { client } from "../services/index.service.js";

const bookmarkDatamapper = {
  getAll: async function () {
    const sql = `SELECT * FROM "Bookmark"`;

    const results = await client.query(sql);
    return results.rows;
  },

  get: async function (id) {
    const sql = `SELECT * FROM "Bookmark" WHERE id = $1`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },

  getBy: async function ({ name, description, link }) {
    const sql = `SELECT * FROM "Bookmark" WHERE name = $1 OR description = $2 OR link = $3`;
    const values = [name, description, link];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  getByUser: async function (id) {
    const sql = `SELECT
    t.id AS "toolId",
    t.name AS "name",
    COALESCE(json_agg(
    CASE
    WHEN b.id IS NULL THEN NULL
    ELSE json_build_object(
    'id', b.id,
    'name', b.name,
    'description', b.description,
    'link', b.link,
    'userId', b."userId",
    'toolId', b."toolId",
    'createdAt', b."createdAt",
    'imgLink', b."imgLink",
    'updatedAt', b."updatedAt"
    )
    END
    ) FILTER (WHERE b.id IS NOT NULL), '[]'::json) AS bookmarks
    FROM
    public."Tool" t
    LEFT JOIN public."Bookmark" b ON b."toolId" = t.id AND b."userId" = $1
    GROUP BY
    t.id, t.name
    ORDER BY
    t.id ASC;`;

    const result = await client.query(sql, [id]);
    return result.rows;
  },

  create: async function ({
    name,
    description,
    link,
    userId,
    toolId,
    imgLink,
  }) {
    const sql = `INSERT INTO public."Bookmark"(
       name, description, link, "userId", "toolId", "imgLink")
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [name, description, link, userId, toolId, imgLink];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  update: async function ({ name, description, link, imgLink }, id) {
    const sql = `UPDATE "Bookmark" set name = $1, description = $2, link = $3, "imgLink" = $4 WHERE id = $5`;
    const values = [name, description, link, imgLink, id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },

  delete: async function (id) {
    const sql = `DELETE FROM "Bookmark" WHERE id = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default bookmarkDatamapper;
